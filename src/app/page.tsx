"use client";

import { CheckCircle, Dangerous } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";

import { getTodosQuery } from "@/app/lib/graphql/query";
import styles from "./page.module.scss";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { loading, error, data } = useQuery(getTodosQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className={styles.container}>
      <Paper className={styles.left}></Paper>
      <Paper className={styles.right}>
        <Typography variant="h1">My Todo App</Typography>
        <div>
          {data?.todos.map((todo) => (
            <>
              <Paper elevation={2} key={todo.id} className={styles.item}>
                <div className={styles.title}>
                  <Typography>{todo.title}</Typography>
                  <div>
                    <IconButton>
                      {todo.done ? (
                        <CheckCircle color="success" />
                      ) : (
                        <Dangerous color="warning" />
                      )}
                    </IconButton>
                  </div>
                </div>
              </Paper>
            </>
          ))}
        </div>
      </Paper>
    </div>
  );
}
