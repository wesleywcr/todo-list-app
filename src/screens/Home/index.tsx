import { useState } from "react";
import { View } from "react-native";
import { Feather } from '@expo/vector-icons';

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { List } from "../../components/List";

import { styles } from "./styles";

export type Task = {
  id: number;
  text: string;
  isChecked: boolean;
}

export function Home() {
  const [newTaskValue, setNewTaskValue] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask() {
    if (!newTaskValue) {
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      text: newTaskValue,
      isChecked: false
    }

    setTasks(oldTasks => [...oldTasks, newTask]);
  }


  function handleRemoveTask(taskIdToBeRemoved: number) {
    const filteredTasks = tasks.filter(task => task.id !== taskIdToBeRemoved);

    setTasks(filteredTasks);
  }

  function handleTaskCheck(taskIdToBeChecked: number) {
    const immutableTasks = tasks.map(task => ({ ...task }));

    const taskToBeUpdated = immutableTasks.find(task => task.id === taskIdToBeChecked);

    if (taskToBeUpdated) {
      taskToBeUpdated.isChecked = !taskToBeUpdated.isChecked;
      setTasks(immutableTasks);
    }
  }



  return (
    <View style={styles.container}>
      <Header />
      
      <View style={styles.boxContent}>
        <View style={styles.inputContainer}>
          <Input
            value={newTaskValue}
            onChangeText={setNewTaskValue}
          />
          <Button 
            onPress={handleAddTask}
          >
            <Feather 
              name="plus-circle" 
              size={16} 
              color="#F2F2F2"
            />
          </Button>
        </View>

        <List
          data={tasks}
          removeTask={handleRemoveTask}
          toggleTaskCheck={handleTaskCheck}
        />
      </View>
    </View>
  )
}