const repoTitle = () => {
    return (
        <h1>Angular/Angular-cli</h1>
    )
}

const mainBlock = (gitIssue) => {
    return (
        <div>
            <p key={gitIssue.id + "number"}>{gitIssue.number}</p>
            <p key={gitIssue.id + "title"}>{gitIssue.title}</p>
            <p key={gitIssue.id + "login"}>{gitIssue.login}</p>
            <p key={gitIssue.id + "created_at"}>{gitIssue.created_at}</p>
            <p key={gitIssue.id + "comments"}>{gitIssue.comments}</p>
        </div>
    )
}

export {repoTitle, mainBlock};