import { ApolloClient } from "@apollo/client";
import { GetServerSideProps } from "next";
import { initializeApollo } from "../../lib/client";
import {
  TaskQuery,
  TaskQueryVariables,
  TasksDocument,
  TasksQueryVariables,
  useTaskQuery,
} from "../../generated/graphql-frontend";
import { useRouter } from "next/router";
import Error from "next/error";
import { UpdateTaskForm } from "../../components/UpdateTaskForm";

const UpdateTask = () => {
  const router = useRouter();
  const id =
    typeof router.query?.id == "string" ? parseInt(router.query.id) : NaN;
  if (!id) {
    return <Error statusCode={404} />;
  }
  const { data, loading, error } = useTaskQuery({ variables: { id } });
  const task = data?.task;

  return loading ? (
    <p>Loading ...</p>
  ) : error ? (
    <p>An error occured.</p>
  ) : task ? (
    <UpdateTaskForm id={id} initialValues={{ title: task.title }} />
  ) : (
    <p>Task not found</p>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id =
    typeof context.params?.id == "string" ? parseInt(context.params.id) : NaN;

  if (id) {
    const apolloClient = initializeApollo();
    await apolloClient.query<TaskQuery, TaskQueryVariables>({
      query: TasksDocument,
      variables: { id },
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  } else {
    return { props: {} };
  }
};

export default UpdateTask;
