export function PriorityColumn({ title, color, tasks }) {
  return (
    <div className={`card-elevated p-5 border ${color} space-y-4`}>

      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-10">
          No tasks
        </p>
      )}

      {tasks.map(task => (
        <div
          key={task._id}
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <h4 className="font-medium mb-2">
            <a href={`/task/${task._id}`}>{task.title}</a>
          </h4>

          <div className="text-sm text-muted-foreground space-y-1">
            <div>📅 {new Date(task.dueDate).toLocaleDateString()}</div>
            <div className="capitalize">
              ⏳ {task.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
