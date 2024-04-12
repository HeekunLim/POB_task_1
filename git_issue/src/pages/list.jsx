import Axios from "axios";
import React from "react";
import Cat from "./IMG_2126.jpg";

const List = () => {
    // number, title, user.login, comments, created_at
    const [gitIssue, setGitIssue] = React.useState([]);

    React.useEffect(()=>{
        Axios
            .get("https://api.github.com/repos/angular/angular-cli/issues?sort=comments-desc", {
                headers: {Authorization: "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"},
            })
            .then((response) => {
                for (let i = 0; i < response.data.length; i++){
                    if (i === 4){
                        let AD = {};
                        AD.id = "cat";
                        setGitIssue(old => [...old, AD]);
                    }

                    let newData = {};
                    newData = {};
                    newData.id = i;
                    newData.number = response.data[i].number;
                    newData.title  = response.data[i].title;
                    newData.login = response.data[i].user.login;
                    newData.comments = response.data[i].comments;
                    newData.created_at = response.data[i].created_at;

                    setGitIssue(old => [...old, newData]);
                }

                console.log(JSON.stringify(gitIssue));
            });
    }, [])

    return (
        <div>
            <h1>리스트</h1>
            {gitIssue.map((gitIssue) => {
                if (gitIssue.id === "cat"){
                    return(
                        <a href="https://www.wanted.co.kr/">
                            <img src={Cat} alt="" style={{width: "200px"}}/>
                        </a>                      
                    )
                }
                else {
                    return <p key={gitIssue.id + "issue"}>{JSON.stringify(gitIssue)}</p>
                }
            })}
        </div>
    );
};

export default List;