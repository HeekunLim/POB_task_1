import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { repoTitle, mainBlock } from "./headers";

const Detail = () => {
    // user.avatar_url, body
    const token = "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";
    const [gitIssue, setGitIssue] = React.useState([]);
    const {gitIssueNumber} = useParams();

    React.useEffect(()=>{
        try {
            Axios
                .get("https://api.github.com/repos/angular/angular-cli/issues/" + gitIssueNumber, {
                    headers: {Authorization: "token" + token},
                })
                .then((response) => {
                    let newData = {};
                    newData.id = "selected"
                    newData.number = response.data.number;
                    newData.title  = response.data.title;
                    newData.login = response.data.user.login;
                    newData.comments = response.data.comments;
                    newData.created_at = response.data.created_at.substr(0, 10);
                    newData.avatar_url = response.data.user.avatar_url;
                    newData.body = response.data.body;

                    setGitIssue(newData);
                });
        } catch(error) {
            console.error(error);
        }
        
    }, [])

    return (
        <div style={{ display: "flex", justifyContent: "center"}}>
            <div style={{width: "900px"}}>
                {repoTitle()}
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img src={gitIssue.avatar_url} alt={gitIssue.login} style={{width: "125.97px", height: "125.97px"}}/>
                    </div>
                    <div style={{flex: "1 0 auto", width: "774.03px"}}>
                        {mainBlock(gitIssue)}
                    </div>
                </div>
                <hr style={{border: "solid"}}></hr>
                <ReactMarkdown>{gitIssue.body}</ReactMarkdown>
            </div>
        </div>
    );
};

export default Detail;