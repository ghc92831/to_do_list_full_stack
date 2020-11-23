json.tasks do
  json.array! @tasks do |task|
    json.id         task.id
    json.content    task.content
    json.completed  task.completed
    json.due        task.due
    json.created_at task.created_at
    json.updated_at task.updated_at
  end
end

# {
#   "tasks": [
#     {
#       "id": 1,
#       "content": "Content #1",
#       "completed": false,
#       "created_at": "2017-01-01..."
#     }, {
#       "id": 2,
#       "content": "Content #2",
#       "completed": false,
#       "created_at": "2017-01-01..."
#     }, {
#       "task": {
#       "content": "Task Content"
#       }
#     }
#   ]
# }
