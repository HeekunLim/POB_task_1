const repoTitle = () => {
    return (
        <h1 style={{display: "flex", justifyContent: "center"}}>Angular / Angular-cli</h1>
    )
}

const mainBlock = (gitIssue) => {
    return (
        <div style={{display: "flex"}}>
            <div style={{display: "flex", flexDirection: "column", marginRight: "auto"}}>
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <h3 key={gitIssue.id + "number"} style={{color: "blueviolet"}}>#{gitIssue.number}&nbsp;</h3>
                    <h3 key={gitIssue.id + "title"}>{gitIssue.title}</h3>
                </div>
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <h4 key={gitIssue.id + "login"}>작성자: {gitIssue.login},&nbsp;</h4>
                    <h4 key={gitIssue.id + "created_at"}>작성일: {gitIssue.created_at}</h4>
                </div>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
                <h4 key={gitIssue.id + "comments"}>코멘트: {gitIssue.comments}</h4>
            </div>
        </div>
    )
}

export {repoTitle, mainBlock};