import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { repoTitle, mainBlock } from "./headers";
import myStore from "../store"

const Detail = () => {
    const {gitIssueNumber} = useParams();
    const { gitIssue, setGitIssue } = React.useContext(myStore);

    React.useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    for (let issue of gitIssue){
        if (issue.number == gitIssueNumber){
            return (
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <div style={{width: "900px"}}>
                        {repoTitle()}
                        <div style={{display: "flex", justifyContent: "flex-start"}}>
                            <div style={{display: "flex", alignItems: "center", marginRight: "10px"}}>
                                <img src={issue.avatar_url} alt={issue.login} style={{width: "125.97px", height: "125.97px"}}/>
                            </div>
                            <div style={{flex: "1 0 auto", width: "764.03px"}}>
                                {mainBlock(issue)}
                            </div>
                        </div>
                        <hr style={{border: "solid"}}></hr>
                        <ReactMarkdown>{issue.body}</ReactMarkdown>
                    </div>
                </div>
            );
        }
    }
};

export default Detail;