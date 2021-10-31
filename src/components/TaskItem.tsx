import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";

interface TaskItemProps {
  index: number;
  item: {
    id: number;
    done: boolean;
    title: string;
  };
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
}

export function TaskItem({
  item,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [titleEdit, setTitleEdit] = useState(item.title);
  const [isEditing, setIsEditting] = useState(false);

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    setIsEditting(true);
  };

  const handleCancelEditing = () => {
    setTitleEdit(item.title);
    setIsEditting(false);
  };

  const handleSubmitEditing = () => {
    editTask(item.id, item.title);
    setIsEditting(false);
  };
  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
            //TODO - use style prop
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={titleEdit}
            onChangeText={(title) => setTitleEdit(title)}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.iconsContainer}>
          {isEditing ? (
            <TouchableOpacity onPress={handleCancelEditing}>
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleStartEditing}>
              <Image source={editIcon} />
            </TouchableOpacity>
          )}

          <View style={styles.iconsDivider} />

          <TouchableOpacity
            disabled={isEditing}
            onPress={() => removeTask(item.id)}
          >
            <Image
              source={trashIcon}
              style={{ opacity: isEditing ? 0.2 : 1 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
