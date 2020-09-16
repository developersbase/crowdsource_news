import React from "react";
import { Editor } from "@tinymce/tinymce-react";

class Publish extends React.Component {
  handleEditorChange = (e) => {
    console.log("Content was updated:", e.target.getContent());
  };

  render() {
    return (
      <Editor
        apiKey="43kg5ds4aya37y3pfp66ic3q1ybgck6d3pm0uu4nldjjpkxf"
        initialValue="<p>Initial content</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default Publish;
