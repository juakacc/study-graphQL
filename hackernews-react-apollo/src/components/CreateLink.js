import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const POST_MUTATION = gql`
  mutation PostMutation($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      createdAt
      url
      description
    }
  }
`;

class CreateLink extends React.Component {
  state = {
    description: "",
    url: "",
  };

  render() {
    const { description, url } = this.state;

    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
          <Mutation
            mutation={POST_MUTATION}
            variables={{ description, url }}
            onCompleted={() => this.props.history.push("/")}
          >
            {(postMutation) => <button onClick={postMutation}>Submit</button>}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default CreateLink;
