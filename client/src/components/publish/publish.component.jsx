import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";

import { addPost } from "../../redux/reducers/posts/posts.actions";

const Publish = ({ addPost }) => {
  // const [content, setContent] = useState("Write Here...");

  const [content, setContent] = useState({
    title: "",
    body: "",
  });

  const { title, body } = content;

  // const handleChange = (content, editor) => {
  //   setContent(content);
  // };

  const onChange = (e) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   addPost(title, body);
  //   console.log(content);
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ title, body });
    console.log(content);
  };

  return (
    <div className="flex flex-col container w-full md:max-w-3xl mx-auto">
      <form onSubmit={(e) => onSubmit(e)}>
        <div class="w-full h-screen">
          <div class="w-full">
            <input
              class="w-full bg-gray-100 rounded focus:border-l-4 text-5xl px-4 py-4"
              placeholder="Title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="w-full">
            <textarea
              class="w-full bg-gray-100 rounded focus:outline-none h-48 focus:border-indigo-500 text-base px-4 resize-none block"
              placeholder="Message"
              name="body"
              value={body}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
        </div>
        {/* <Editor
        apiKey="43kg5ds4aya37y3pfp66ic3q1ybgck6d3pm0uu4nldjjpkxf"
        init={{
          height: 500,
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          menubar: false,
        }}
        value={content}
        onEditorChange={handleChange}
      /> */}
        <br />
        <input
          type="submit"
          value="Submit"
          className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg m-5"
        />
      </form>
    </div>
  );
};

Publish.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(Publish);

// class Publish extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { content: "" };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(content, editor) {
//     this.setState({ content });
//   }

//   handleSubmit(event) {
//     addPost(this.state.content);
//     //alert(this.state.content);
//     console.log(this.state.content);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <Editor
//           apiKey="43kg5ds4aya37y3pfp66ic3q1ybgck6d3pm0uu4nldjjpkxf"
//           initialValue="<p>Initial content</p>"
//           value={this.state.content}
//           init={{
//             height: 500,
//             plugins: [
//               "advlist autolink lists link image",
//               "charmap print preview anchor help",
//               "searchreplace visualblocks code",
//               "insertdatetime media table paste wordcount",
//             ],
//             menubar: false,
//           }}
//           onEditorChange={this.handleChange}
//         />
//         <br />
//         <input
//           type="submit"
//           value="Submit"
//           className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
//         />
//       </form>
//     );
//   }
// }

// export default connect(null, { addPost })(Publish);
