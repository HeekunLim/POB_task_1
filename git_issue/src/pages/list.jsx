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
                    newData.number = JSON.stringify(response.data[i].number);
                    newData.title  = JSON.stringify(response.data[i].title).replaceAll("\"", "");
                    newData.login = JSON.stringify(response.data[i].user.login).replaceAll("\"", "");;
                    newData.comments = JSON.stringify(response.data[i].comments).replaceAll("\"", "");;
                    newData.created_at = JSON.stringify(response.data[i].created_at.substr(0, 10)).replaceAll("\"", "");;

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
                        <div>
                            <a href="https://www.wanted.co.kr/">
                                <img src={Cat} alt="" style={{width: "1000px"}}/>
                            </a>
                        </div>                      
                    )
                }
                else {
                    return (
                        <div>
                            <button onClick={() => handleClick(gitIssue.number)} style={{width: "1000px"}}>
                                <p key={gitIssue.id + "issue"}>{gitIssue.number}</p>
                                <p key={gitIssue.id + "issue"}>{gitIssue.title}</p>
                                <p key={gitIssue.id + "issue"}>{gitIssue.login}</p>
                                <p key={gitIssue.id + "issue"}>{gitIssue.created_at}</p>
                                <p key={gitIssue.id + "issue"}>{gitIssue.comments}</p>
                            </button>
                        </div>
                    )
                }
            })}
        </div>
    );
};

export default List;