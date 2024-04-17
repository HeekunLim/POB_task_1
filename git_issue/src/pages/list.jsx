import Axios from "axios";
import React from "react";
import Cat from "./IMG_2126.jpg";
import { useNavigate } from "react-router-dom";
import { repoTitle, mainBlock } from "./headers";
import myStore from "../store";
import Styled from "styled-components";

const List = () => {
  const { gitIssue, setGitIssue } = React.useContext(myStore);
  const { page, setPage } = React.useContext(myStore);
  let navigate = useNavigate();

  React.useEffect(() => {
    setGitIssue([]);

    try {
      Axios.get(
        "https://api.github.com/repos/angular/angular-cli/issues?state=open&sort=comments-desc&per_page=10000",
        {
          headers: {
            Authorization: "token " + process.env.REACT_APP_API_KEY,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (i === 4) {
            let AD = {};
            AD.id = "cat";
            setGitIssue((old) => [...old, AD]);
          }

          let newData = {
            id: i,
            number: response.data[i].number,
            title: response.data[i].title,
            login: response.data[i].user.login,
            comments: response.data[i].comments,
            created_at: response.data[i].created_at.substr(0, 10),
            avatar_url: response.data[i].user.avatar_url,
            body: response.data[i].body,
          };

          setGitIssue((old) => [...old, newData]);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleClick(number) {
    navigate("/detail/" + number);
  }

  return (
    <Container>
      <IssueContainer>
        {repoTitle()}
        {gitIssue.slice(0, page * 10).map((gitIssue) => {
          if (gitIssue.id === "cat") {
            return (
              <div key={"ad"}>
                <ImageLink href="https://www.wanted.co.kr/">
                  <img src={Cat} alt="Wanted" />
                </ImageLink>
              </div>
            );
          } else {
            return (
              <div key={gitIssue.id + "issue"}>
                <IssueButton onClick={() => handleClick(gitIssue.number)}>
                  {mainBlock(gitIssue)}
                </IssueButton>
              </div>
            );
          }
        })}
      </IssueContainer>
    </Container>
  );
};

export default List;

const Container = Styled.div`
    display: flex;
    justify-content: center;
`;

const IssueContainer = Styled.div`
    width: 900px;
`;

const ImageLink = Styled.a`
    img {
        width: 900px;
        margin: 2px;
    }
`;

const IssueButton = Styled.button`
    width: 900px;
    background-color: #e8eaea;
    margin: 2px;
`;
