import Head from "next/head";
import { initializeApollo } from "../lib/client";
import {
  TasksDocument,
  TasksQuery,
  useTasksQuery,
} from "../generated/graphql-frontend";
import { TaskList } from "../components/TaskList";

export default function Home() {
  const result = useTasksQuery();
  const tasks = result.data?.tasks;

  return (
    <div>
      <Head>
        <title>Tasks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {result.loading ? (
        <p>Loading tasks...</p>
      ) : result.error ? (
        <p>An error occured.</p>
      ) : tasks && tasks.length > 0 ? (
        <TaskList tasks={tasks}></TaskList>
      ) : (
        <p className="no-tasks-message">You've got no tasks.</p>
      )}
    </div>
  );
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query<TasksQuery>({
    query: TasksDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
