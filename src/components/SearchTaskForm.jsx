import Field from "./Field.jsx";

const SearchTaskForm = ({
    onSearchInput
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
                onInput={(event) => onSearchInput(event.target.value)}
            />
        </form>
    )
}

export default SearchTaskForm