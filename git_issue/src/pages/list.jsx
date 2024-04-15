import Axios from "axios";
import React from "react";
import Cat from "./IMG_2126.jpg";
import { useNavigate } from "react-router-dom";
import { repoTitle, mainBlock } from "./headers";

const myStore = React.createContext();

const List = () => {
    // number, title, user.login, comments, created_at
    const token = "token";
    const [gitIssue, setGitIssue] = React.useState([]);
    let navigate = useNavigate();

    React.useEffect(()=>{
        try {
            Axios
                .get("https://api.github.com/repos/angular/angular-cli/issues?state=open&sort=comments-desc&per_page=1000", {
                    headers: {
                        Authorization: "token " + token,
                        "Content-Type": 'application/json'
                    },
                })
                .then((response) => {
                    for (let i = 0; i < response.data.length; i++){
                        if (i === 4){
                            let AD = {};
                            AD.id = "cat";
                            setGitIssue(old => [...old, AD]);
                        }

                        let newData = {
                            id: i,
                            number: response.data[i].number,
                            title: response.data[i].title,
                            login: response.data[i].user.login,
                            comments: response.data[i].comments,
                            created_at: response.data[i].created_at.substr(0, 10),
                        };

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
                    return (
                        <div style={{ display: "flex", justifyContent: "center"}}>
                            <div style={{width: "900px"}}>
                                {repoTitle()}
                                {value.gitIssue.map((gitIssue) => {
                                    if (gitIssue.id === "cat"){
                                        return(
                                            <div key={"ad"}>
                                                <a key={"adLink"} href="https://www.wanted.co.kr/">
                                                    <img key={"image"} src={Cat} alt="Wanted" style={{width: "900px", margin: "2px"}}/>
                                                </a>
                                            </div>                      
                                        )
                                    }
                                    else {
                                        return (
                                            <div key={gitIssue.id + "issue"}>
                                                <button key={gitIssue.id + "button"} onClick={() => handleClick(gitIssue.number)} style={{width: "900px", backgroundColor: "#e8eaea", margin: "2px"}}>
                                                    {mainBlock(gitIssue)}
                                                </button>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    )
                }}
            </myStore.Consumer>
        </myStore.Provider>
    );
};

export default List;