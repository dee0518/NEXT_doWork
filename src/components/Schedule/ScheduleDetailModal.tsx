import { scheduleActions } from 'store/modules/schedule';
import { deleteSchedule } from 'lib/schedule';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';
import Modal from 'components/Common/Modal';
import DetailContent from 'components/Schedule/DetailContent';
import { iScheduleInfo } from 'types/schedule';

const ScheduleDetailModal = () => {
  const dispatch = useReduxDispatch();
  const { scheduleDetail } = useReduxSelector(state => state.schedule);
  const { status, title } = scheduleDetail as iScheduleInfo;

  const onClose = () => {
    dispatch(scheduleActions.setScheduleDetail(null));
  };

  const onClickEdit = () => {
    dispatch(scheduleActions.setIsShowEditedModal(true));
  };

  const onClickDelete = async (_id: string) => {
    try {
      const deletedresponse = await deleteSchedule(_id);

      if (deletedresponse && deletedresponse.result) {
        dispatch(scheduleActions.setScheduleDetail(null));
        dispatch(scheduleActions.setFilterScheduleList(_id));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal type={status} title={title} onClose={onClose}>
      <DetailContent schedule={scheduleDetail} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
    </Modal>
  );
};

export default ScheduleDetailModal;
