from fastapi import FastAPI, Body, Path, HTTPException
from starlette import status

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
async def create_todo(task=Body(...)):
    if not task:
        raise HTTPException(status_code=400, detail={"error": "Task is required"})

    new_todo = {
        "id": len(todo_list) + 1,
        "task": task["task"].strip(),
        "completed": False
    }

    todo_list.append(new_todo)
    return {"data": new_todo}

@app.put("/todos/{id}", status_code=status.HTTP_200_OK)
async def update_todo(id: int, task=Body()):
    for todo in todo_list:
        if todo["id"] == id:
            if task:
                todo["task"] = task["task"].strip()
            return {"data": todo}

    raise HTTPException(status_code=404, detail={"error": "Todo not found"})

@app.delete("/todos/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(id: int):
    for todo in todo_list:
        if todo["id"] == id:
            todo_list.remove(todo)
            return

    raise HTTPException(status_code=404, detail={"error": "Todo not found"})