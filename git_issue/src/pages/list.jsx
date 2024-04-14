import Axios from "axios";
import React from "react";
import Cat from "./IMG_2126.jpg";
import { useNavigate } from "react-router-dom";
import { repoTitle, mainBlock } from "./headers";

const myStore = React.createContext();

const List = () => {
    // number, title, user.login, comments, created_at
    const token = "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";
    const [gitIssue, setGitIssue] = React.useState([]);
    let navigate = useNavigate();

    React.useEffect(()=>{
        try {
            Axios
                .get("https://api.github.com/repos/angular/angular-cli/issues?sort=comments-desc", {
                    headers: {Authorization: "token" + token},
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
        } catch(error) {
            console.error(error);
        }
        
    }, [])

    function handleClick(number) {
        navigate("/detail/" + number);
    }

    return (
        <myStore.Provider value={{gitIssue, setGitIssue}}>
            <myStore.Consumer>
                {(value) => {
                    console.log(value);

                    return (
                        <div style={{width: "1216px"}}>
                            {repoTitle()}
                            {gitIssue.map((gitIssue) => {
                                if (gitIssue.id === "cat"){
                                    return(
                                        <div key={"ad"}>
                                            <a key={"adLink"} href="https://www.wanted.co.kr/">
                                                <img key={"image"} src={Cat} alt="Wanted" style={{width: "1216px"}}/>
                                            </a>
                                        </div>                      
                                    )
                                }
                                else {
                                    return (
                                        <div key={gitIssue.id + "issue"} style={{width: "1216px"}}>
                                            <button key={gitIssue.id + "button"} onClick={() => handleClick(gitIssue.number)} style={{width: "1216px"}}>
                                                {mainBlock(gitIssue)}
                                            </button>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    )
                }}
            </myStore.Consumer>
        </myStore.Provider>
    );
};

export default List;