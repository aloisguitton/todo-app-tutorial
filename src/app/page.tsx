"use client";

import { AddCircle, CheckCircle, Dangerous } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { insertTodoMutation, updateTodoMutation } from "./lib/graphql/mutation";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { getTodosQuery } from "@/app/lib/graphql/query";
import styles from "./page.module.scss";

export default function Home() {
  const [title, setTitle] = useState("");

  const { loading, error, data, refetch } = useQuery(getTodosQuery);
  const [createTodo, { data: dataCreate }] = useMutation(insertTodoMutation);
  const [updateTodo, { data: dataUpdate }] = useMutation(updateTodoMutation);

  useEffect(() => {
    if (dataCreate || dataUpdate) {
      refetch();
      setTitle("");
    }
  }, [dataCreate, refetch, dataUpdate]);

  if (error) return <p>Error</p>;

  return (
    <div className={styles.container}>
      <Paper className={styles.left}>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label={"Title"}
          fullWidth
        />
        <div>
          <Button
            variant="contained"
            startIcon={<AddCircle />}
            onClick={() => {
              createTodo({ variables: { title } });
            }}
          >
            Add
          </Button>
        </div>
      </Paper>
      <Paper className={styles.right}>
        <Typography variant="h1">My Todo App</Typography>
        {loading ? (
          "loading"
        ) : (
          <div>
            {data?.todos.map((todo) => (
              <>
                <Paper elevation={2} key={todo.id} className={styles.item}>
                  <div className={styles.title}>
                    <Typography>{todo.title}</Typography>
                    <div>
                      <IconButton
                        onClick={() =>
                          updateTodo({
                            variables: {
                              updateTodoId: todo.id,
                              done: !todo.done,
                            },
                          })
                        }
                      >
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
        )}
      </Paper>
    </div>
  );
}
