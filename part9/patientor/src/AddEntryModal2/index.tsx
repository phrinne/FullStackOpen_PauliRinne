import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm2, { EntryForm2Values } from './AddEntryForm2';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryForm2Values) => void;
  error?: string;
}

const AddEntryModal2 = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry (Occupational)</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm2 onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal2;