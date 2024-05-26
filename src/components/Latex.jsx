import React from "react";

class Latex extends React.Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  componentDidMount() {
    this.renderMath();
  }

  componentDidUpdate() {
    this.renderMath();
  }

  renderMath() {
    window.MathJax.Hub.Queue([
      "Typeset",
      window.MathJax.Hub,
      this.node.current
    ]);
  }

  render() {
    // Destructure the text prop
    const { text } = this.props;

    return (
      <div ref={this.node}>
        {text}
      </div>
    );
  }
}

export default Latex;
