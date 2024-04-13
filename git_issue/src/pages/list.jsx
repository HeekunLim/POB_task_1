import Axios from "axios";
import React from "react";
import Cat from "./IMG_2126.jpg";
import { useNavigate } from "react-router-dom";

const List = () => {
    // number, title, user.login, comments, created_at
    const [gitIssue, setGitIssue] = React.useState([]);
    let navigate = useNavigate();

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
                    newData.id = i;
                    newData.number = response.data[i].number;
                    newData.title  = response.data[i].title;
                    newData.login = response.data[i].user.login;
                    newData.comments = response.data[i].comments;
                    newData.created_at = response.data[i].created_at.substr(0, 10);

                    setGitIssue(old => [...old, newData]);
                }
            });
    }, [])

    function handleClick(number) {
        navigate("/detail/" + number);
    }

    return (
        <div>
            <h1>리스트</h1>
            {gitIssue.map((gitIssue) => {
                if (gitIssue.id === "cat"){
                    return(
                        <div key={"ad"}>
                            <a key={"adLink"} href="https://www.wanted.co.kr/">
                                <img key={"image"} src={Cat} alt="Wanted" style={{width: "800px"}}/>
                            </a>
                        </div>                      
                    )
                }
                else {
                    return (
                        <div key={gitIssue.id + "issue"}>
                            <button key={gitIssue.id + "button"} onClick={() => handleClick(gitIssue.number)} style={{width: "800px"}}>
                                <p key={gitIssue.id + "number"}>{gitIssue.number}</p>
                                <p key={gitIssue.id + "title"}>{gitIssue.title}</p>
                                <p key={gitIssue.id + "login"}>{gitIssue.login}</p>
                                <p key={gitIssue.id + "created_at"}>{gitIssue.created_at}</p>
                                <p key={gitIssue.id + "comments"}>{gitIssue.comments}</p>
                            </button>
                        </div>
                    )
                }
            })}
        </div>
    );
};

export default List;