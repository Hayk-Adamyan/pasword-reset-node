import "./Draggablet.css"
import React, { Component } from "react";
import { CloseOutlined } from "@material-ui/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./Draggablet.css"
// fake data generator const getItems = (count) =>   Array.from({ length: count
// }, (v, k) => k).map((k) => ({     id: `item-${k}`,     content: `item ${k}`,
// })); a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    background: isDragging
        ? "lightgreen"
        : "#ECE7B4",
    ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver
        ? "lightblue"
        : "lightgrey",
    padding: grid,
    width: 360
});

export class DraggableTodoList extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this
            .onDragEnd
            .bind(this);
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const items = reorder(this.props.items, result.source.index, result.destination.index);

        localStorage.setItem("items", JSON.stringify(items))

        this
            .props
            .handleDragEnd(items);
    }
    filterTodos = (todo) => {
        if (this.props.filter === 1) {
            return !!todo.is_completed
        }
        if (this.props.filter === 2) {
            return !todo.is_completed
        }
        return true
    }
    render() {
        // console.log(this.props.items);
        return (
            <DragDropContext className="dragAll" onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div className="dragAll"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}>
                            {this
                                .props
                                .items
                                .filter(this.filterTodos)
                                .map((item, index) => (
                                    <Draggable
                                        key={item._id || item.id}
                                        draggableId={item._id || item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div className="drag"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                <div
                                                    data-id={item._id || item.id}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between"
                                                    }}>
                                                    <div
                                                        style={{
                                                            overflow: "auto",
                                                            display: "flex"
                                                        }}>

                                                        <div
                                                            className={`${item.is_completed
                                                                ? "done"
                                                                : "overflow"}`}>
                                                            <input
                                                                type="checkbox"
                                                                checked={!!item.is_completed}
                                                                onChange={(e) => {
                                                                    e.stopPropagation()
                                                                    this.props.updateTodo({
                                                                        ...item,
                                                                        is_completed: e.target.checked
                                                                    })
                                                                }} />

                                                            <div>{item.task}</div>
                                                            <div>
                                                                {item.dateLine || item.deadline}</div>
                                                        </div>


                                                    </div>

                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            height: "max-content"
                                                        }}>
                                                        <div
                                                            className={`${item.priority === "Low"
                                                                ? "green"
                                                                : item.priority === "Middle"
                                                                    ? "orange"
                                                                    : item.priority === "High"
                                                                        ? "red"
                                                                        : ""}`}>
                                                            {item.priority}
                                                        </div>

                                                    </div>

                                                    <CloseOutlined
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={this.props.RemoveTodo} />

                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}
