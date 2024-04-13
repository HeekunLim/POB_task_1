import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
    // user.avatar_url, body
    const [gitIssue, setGitIssue] = React.useState([]);
    const {gitIssueNumber} = useParams();

    React.useEffect(()=>{
        Axios
            .get("https://api.github.com/repos/angular/angular-cli/issues/" + gitIssueNumber, {
                headers: {Authorization: "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"},
            })
            .then((response) => {
                let newData = {};
                newData.number = JSON.stringify(response.data.number);
                newData.title  = JSON.stringify(response.data.title).replaceAll("\"", "");
                newData.login = JSON.stringify(response.data.user.login).replaceAll("\"", "");
                newData.comments = JSON.stringify(response.data.comments).replaceAll("\"", "");
                newData.created_at = JSON.stringify(response.data.created_at.substr(0, 10)).replaceAll("\"", "");
                newData.avatar_url = JSON.stringify(response.data.user.avatar_url).replaceAll("\"", "");
                newData.body = JSON.stringify(response.data.body).replaceAll("\"", "");

                setGitIssue(newData);
            });
    }, [])

    return (
        <div>
            <h1>디테일</h1>
            <img src={gitIssue.avatar_url} alt="" style={{width: "50px"}}/>
            <p key={gitIssue.id + "issue"}>{gitIssue.number}</p>
            <p key={gitIssue.id + "issue"}>{gitIssue.title}</p>
            <p key={gitIssue.id + "issue"}>{gitIssue.login}</p>
            <p key={gitIssue.id + "issue"}>{gitIssue.created_at}</p>
            <p key={gitIssue.id + "issue"}>{gitIssue.comments}</p>
            <p key={gitIssue.id + "issue"}>{gitIssue.body}</p>
        </div>
    );
};

export default Detail;