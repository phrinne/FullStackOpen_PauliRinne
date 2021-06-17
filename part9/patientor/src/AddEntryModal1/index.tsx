import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm1, { EntryForm1Values } from './AddEntryForm1';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryForm1Values) => void;
  error?: string;
}

const AddEntryModal1 = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry (Hospital)</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm1 onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal1;