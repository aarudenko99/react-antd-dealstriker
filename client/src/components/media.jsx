import React from "react";
import Media from "react-media";

const injectMedia = Component =>
  class extends React.PureComponent {
    render() {
      return (
        <Media query={{ maxWidth: 768 }}>
          {mobileQueryMatches => <Component {...this.props} mobileQueryMatches={mobileQueryMatches} />}
        </Media>
      );
    }
  };

export default injectMedia;
