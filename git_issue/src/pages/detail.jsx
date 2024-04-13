import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
    const [gitIssue, setGitIssue] = React.useState();
    const {gitIssueNumber} = useParams();

    React.useEffect(()=>{
        console.log(gitIssueNumber);

        Axios
            .get("https://api.github.com/repos/angular/angular-cli/issues/" + gitIssueNumber, {
                headers: {Authorization: "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"},
            })
            .then((response) => {
                setGitIssue(response);
            });
    }, [])

    return (
        <div>
            <h1>디테일</h1>
            {JSON.stringify(gitIssue)}
        </div>
    );
};

export default Detail;