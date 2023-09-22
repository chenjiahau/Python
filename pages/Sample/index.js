import sampleStyle from './sample.module.scss';

import { useState } from 'react';
import { Container } from 'react-bootstrap';

// Sub sample pages.
import MessageBoxSample from './MessageBoxSample';
import MessageBoxGroupSample from './MessageBoxGroupSample';
import InputSample from './InputSample';
import InputWithIconSample from './InputWithIconSample';
import InputWithIconButtonSample from './InputWithIconButtonSample';
import TextareaSample from './TextareaSample';
import InputWithUploadButtonSample from './InputWithUploadButtonSample';
import CheckboxSample from './CheckboxSample';
import RadioButtonSample from './RadioButtonSample';
import LinkerSample from './LinkerSample';
import ButtonSample from './ButtonSample';
import ButtonActionSample from './ButtonActionSample';
import ModalContainerSample from './ModalContainerSample';
import AssociatedTableModalContainerSample from './AssociatedTableModalContainerSample';
import BreadcrumbsSample from './BreadcrumbsSample';
import InlineTitleSample from './InlineTitleSample';
import TabSample from './TabSample';
import TabSubTabSample from './TabSubTabSample';
import IconSample from './IconSample';
import TooltipDialogSample from './TooltipDialogSample';
import TooltipDialogFixedSample from './TooltipDialogFixedSample';
import EditableNameBoxSample from './EditableNameBoxSample';
import DropdownWithItemSample from './DropdownWithItemSample';
import DropdownWithCheckboxSample from './DropdownWithCheckboxSample';
import DropdownWithTimeFrameSample from './DropdownWithTimeFrameSample';
import AccessPrivilegeSample from './AccessPrivilegeSample';

const Sample = () => {
  return (
    <div className="main-body">
      <Container fluid className={`after-login-content pt-3 ${sampleStyle['sample-container']}`}>

        <MessageBoxSample />
        <MessageBoxGroupSample />
        <EditableNameBoxSample />
        <InputSample />
        <InputWithIconSample />
        <InputWithIconButtonSample />
        <InputWithUploadButtonSample />
        <TextareaSample />
        <CheckboxSample />
        <RadioButtonSample />
        <LinkerSample />
        <ButtonSample />
        <ButtonActionSample />
        <IconSample/>
        <TooltipDialogSample />
        <TooltipDialogFixedSample />
        <TabSample/>
        <TabSubTabSample />
        <ModalContainerSample/>
        <AssociatedTableModalContainerSample />
        <BreadcrumbsSample />
        <InlineTitleSample />
        <DropdownWithItemSample />
        <DropdownWithTimeFrameSample />
        <DropdownWithCheckboxSample />
        <AccessPrivilegeSample />

      </Container>
    </div>
  );
};

export default Sample;
