const URL = 'http://localhost:8080/tasks';

const headers = {
    'Content-Type': 'application/json',
};

const tasksAPI = {
    getAll: () => {
        return fetch(URL)
            .then(res => res.json())
    },
    add: (task) => {
        return fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(task),
        })
            .then(res => res.json())
    },
    delete: (id) => {
        return fetch(`${URL}/${id}`, { method: 'DELETE' })
    },
    deleteAll: (tasks) => {
        return Promise.all(tasks.map(({id}) => this.delete(id)))
    },
    toggleComplete: (id, isDone) => {
        return fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ isDone }),
        })
            .then(res => res.json())
    },
}

export default tasksAPI;