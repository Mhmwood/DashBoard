import React from "react";

import {
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

type Props = {
  onDragEnd: (event: DragEndEvent) => void;
};


export const KanbanBoard = ({
  onDragEnd,
  children,
}: React.PropsWithChildren<Props>) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over === null) {
      return;
    }

    onDragEnd(event);
  };

  return (
    <KanbanBoardContainer>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        {children}
      </DndContext>
    </KanbanBoardContainer>
  );
};

export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        maxWidth: "calc(100% + 3.1rem)",
        height: "100vh",
        display: "flex",
        justifyContent: "column",
        margin: "-1.6rem",
        overflowX: "visible",
        overflowY: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",  //for height remenber :)
          display: "flex",
          padding: "32px",
        }}
      >
        {children}
        <style>{`
        /* Hide scrollbars for Webkit browsers (Chrome, Safari, etc.) */
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      </div>
    </div>
  );
};
