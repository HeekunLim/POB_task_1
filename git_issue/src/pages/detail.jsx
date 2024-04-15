import React from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { repoTitle, mainBlock } from "./headers";

const Detail = () => {
    // user.avatar_url, body
    const [gitIssue, setGitIssue] = React.useState([]);
    const {gitIssueNumber} = useParams();

    React.useEffect(()=>{
        try {
            Axios
                .get("https://api.github.com/repos/angular/angular-cli/issues/" + gitIssueNumber, {
                    headers: {
                        Authorization: "token " + process.env.REACT_APP_API_KEY,
                        "Content-Type": 'application/json'
                    },
                })
                .then((response) => {
                    let newData = {
                        id: "selected",
                        number: response.data.number,
                        title: response.data.title,
                        login: response.data.user.login,
                        comments: response.data.comments,
                        created_at: response.data.created_at.substr(0, 10),
                        avatar_url: response.data.user.avatar_url,
                        body: response.data.body,
                    };

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
                    <div style={{display: "flex", alignItems: "center", marginRight: "10px"}}>
                        <img src={gitIssue.avatar_url} alt={gitIssue.login} style={{width: "125.97px", height: "125.97px"}}/>
                    </div>
                    <div style={{flex: "1 0 auto", width: "764.03px"}}>
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