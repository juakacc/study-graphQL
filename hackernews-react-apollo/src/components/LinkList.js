import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Link from "./Link";

class LinkList extends React.Component {
  render() {
    const FEED_QUERY = gql`
      {
        feed {
          links {
            id
            description
            url
          }
        }
      }
    `;

    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error...</div>;

          const linksToRender = data.feed.links;

          return (
            <div>
              {linksToRender.map((item) => (
                <Link key={item.id} link={item} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default LinkList;
