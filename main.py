from fastapi import FastAPI, Path, HTTPException
from starlette import status

from models import TodoItem

app = FastAPI()

todo_list = []

@app.get("/todos/all", status_code=status.HTTP_200_OK)
async def read_todos():
    if not todo_list:
        raise HTTPException(status_code=404, detail={"error": "No todos found"})

    return {"data": todo_list}

@app.get("/todos/{id}", status_code=status.HTTP_200_OK)
async def read_todo(id: int = Path(gt=0)):
    for todo in todo_list:
        if todo["id"] == id:
            return {"data": todo}

    raise HTTPException(status_code=404, detail={"error": "Todo not found"})

@app.post("/todos", status_code=status.HTTP_201_CREATED)
async def create_todo(todo: TodoItem):
    if not todo.task.strip():
        raise HTTPException(status_code=400, detail={"error": "Task cannot be empty"})

    new_todo = todo.dict()
    new_todo["id"] = len(todo_list) + 1

    todo_list.append(new_todo)
    print(todo_list)
    return {"data": new_todo}

@app.put("/todos/{id}", status_code=status.HTTP_200_OK)
async def update_todo(id: int, updated_todo: TodoItem):
    if not updated_todo.task.strip():
        raise HTTPException(status_code=400, detail={"error": "Task cannot be empty"})
    
    for todo in todo_list:
        if todo["id"] == id:
            todo.update(updated_todo.dict())
            return {"data": todo}

    raise HTTPException(status_code=404, detail={"error": "Todo not found"})

@app.delete("/todos/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(id: int):
    for todo in todo_list:
        if todo["id"] == id:
            todo_list.remove(todo)
            return

    raise HTTPException(status_code=404, detail={"error": "Todo not found"})