import Styled from "styled-components";

const repoTitle = () => {
  return <RepoTitle>Angular / Angular-cli</RepoTitle>;
};

const mainBlock = (gitIssue) => {
  return (
    <MainBlockContainer>
      <LeftColumn>
        <IssueInfoRow>
          <IssueNumber key={gitIssue.id + "number"}>
            #{gitIssue.number}&nbsp;
          </IssueNumber>
          <h3 key={gitIssue.id + "title"}>{gitIssue.title}</h3>
        </IssueInfoRow>
        <UserInfoRow>
          <UserInfo key={gitIssue.id + "login"}>
            작성자: {gitIssue.login},
          </UserInfo>
          <UserInfo key={gitIssue.id + "created_at"}>
            작성일: {gitIssue.created_at}
          </UserInfo>
        </UserInfoRow>
      </LeftColumn>
      <CommentsContainer>
        <h4 key={gitIssue.id + "comments"}>코멘트: {gitIssue.comments}</h4>
      </CommentsContainer>
    </MainBlockContainer>
  );
};

export { repoTitle, mainBlock };

const RepoTitle = Styled.h1`
  display: flex;
  justify-content: center;
`;

const MainBlockContainer = Styled.div`
  display: flex;
`;

const LeftColumn = Styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

const IssueInfoRow = Styled.div`
  display: flex;
  justify-content: flex-start;
`;

const IssueNumber = Styled.h3`
  color: blueviolet;
`;

const UserInfoRow = Styled.div`
  display: flex;
  justify-content: flex-start;
`;

const UserInfo = Styled.h4`
  margin-right: 5px;
`;

const CommentsContainer = Styled.div`
  display: flex;
  align-items: center;
`;
