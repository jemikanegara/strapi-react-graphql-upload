import React from 'react';
import './App.css';
import ApolloClient, {gql} from 'apollo-boost-upload';
import { ApolloProvider, useMutation } from '@apollo/react-hooks';

const UPLOAD_DOCUMENT = gql`
mutation (
  $ref: String 
  $refId: ID
  $field: String
  $files: [Upload]!
  ){
  multipleUpload (
    ref: $ref
    refId: $refId
    field: $field
    files: $files
  ){
   	name
  }
}
`

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
});

function UploadDoc() {
  const [ref, setRef] = React.useState('lawfirm-documents')
  const [refId, setRefId] = React.useState('1')
  const [field, setField] = React.useState('Documents')
  const [files, setFiles] = React.useState(null)
  const [uploadDocument, {data, loading , error}] = useMutation(UPLOAD_DOCUMENT)
  return (
    <div className="App">
      <input type="file" multiple onChange={e => {
        setFiles([...e.target.files])
        const variables = {
          ref,
          refId,
          field,
          files: e.target.files
        }
        e.target.validity.valid && uploadDocument({variables})
      }}></input>
    </div>
  );
}

function App() {
    return (
    <ApolloProvider client={client}>
    <UploadDoc />
    </ApolloProvider>
  );
} 

export default App;
