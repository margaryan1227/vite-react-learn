import Field from "./Field.jsx";

const SearchTaskForm = ({
    searchQuery,
    setSearchQuery
}) => {
    return (
        <form
            className="todo__form"
            onSubmit={(e) => e.preventDefault()}
        >
            <Field
                className="todo__field"
                id="search-task"
                label="Search task "
                type="search"
                value={searchQuery}
                onInput={(event) => setSearchQuery(event.target.value)}
            />
        </form>
    )
}

export default SearchTaskForm