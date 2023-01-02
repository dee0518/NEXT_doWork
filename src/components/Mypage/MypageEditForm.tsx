import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from 'middlewares/storage';
import { patchUser } from 'lib/user';
import { authActions } from 'store/modules/auth';
import { useReduxSelector, useReduxDispatch } from 'hooks/useRedux';
import Profile from 'components/Common/Profile';
import InputForm from 'components/Common/InputForm';
import ServiceMain from 'components/Common/ServiceMain';
import Confirm from 'components/Mypage/Confirm';
import MembershipCard from 'components/Mypage/MembershipCard';
import ButtonGroup from 'components/Mypage/ButtonGroup';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';
import { MYPAGE } from 'constants/navigation';
import { iUserInfo } from 'types/auth';

const MypageEditForm = () => {
  const targetRef = useRef<string>('');
  const router = useRouter();
  const dispatch = useReduxDispatch();
  const { user } = useReduxSelector(state => state.auth);
  const { id, email, name, profile, career, introduce } = user as iUserInfo;
  const [userInfo, setUserInfo] = useState({
    name,
    profile,
    career,
    introduce,
  });
  const [file, setFile] = useState<Blob | null>(null);
  const [error, setError] = useState<string>('');
  const [pwError, setPwError] = useState<boolean>(false);
  const [isShowCard, setIsShowCard] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setPassword(value);
  };

  const onCancel = () => router.push(MYPAGE);

  const uploadProfile = () => {
    const storageRef = ref(storage, `images/profile/${email}profile`); // 어떤 폴더 아래에 넣을지 설정
    const upLoadTask = uploadBytesResumable(storageRef, file as Blob);

    upLoadTask.on(
      'state_changed',
      error => {
        setError('파일 업로드에 실패했습니다.' + error);
      },
      () => {
        getDownloadURL(upLoadTask.snapshot.ref).then(url => {
          modifyUser(url);
        });
      },
    );
  };

  const modifyUser = async (profile: string) => {
    try {
      const { name, career, introduce } = userInfo;
      const data = { name, career, introduce, profile };
      const response = await patchUser(id, data);

      if (response && response.result) {
        dispatch(authActions.setUser({ ...(user as iUserInfo), name, career, introduce, profile }));
        router.push(MYPAGE);
      }
    } catch (error) {
      setError('사용자 정보 수정을 실패했어요');
    }
  };

  const onSubmit = () => {
    const { name, career } = userInfo;

    if (name === '' && career === '') {
      setError(name === '' ? 'name' : 'career');
      return;
    }

    setError('');

    file ? uploadProfile() : modifyUser('');
  };

  const onConfirmUser = async () => {
    if (isShowCard) {
      onSubmit();
      return;
    }

    if (user.provider) {
      setIsShowCard(true);
      return;
    }

    const res = await signIn('credentials', { email, password, redirect: false });

    if (res && res.ok) setIsShowCard(true);
    else setPwError(true);
  };

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    reader.onload = () => {
      setFile(fileBlob);
      setUserInfo(prev => ({ ...prev, profile: reader.result as ArrayBuffer }));
    };
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    targetRef.current = name;

    if (name === 'profile') {
      const files = (e.target as HTMLInputElement).files as FileList;
      encodeFileToBase64(files[0]);
      return;
    }

    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (targetRef.current === 'name' || targetRef.current === 'career') {
      const value = userInfo[targetRef.current] as string;

      if (value === '') setError(targetRef.current);
      else setError('');
    }
  }, [userInfo]);

  return (
    <Wrapper>
      <Confirm
        title="Edit Account"
        subTitle="나는 어떤 사람인가요?"
        guide={['같이 일하는 사람들에게 나를 소개해주세요.', '새로운 정보를 업데이트해주세요.']}
        error={pwError}
        pwValue={password}
        onChange={onChangePw}
        isEdit={isShowCard}
      />
      {isShowCard && (
        <MembershipCard>
          <InfoGroup>
            <Greeting>
              <span>안녕하세요</span>
              <span>저는 {name}입니다.</span>
            </Greeting>
            <InputForm
              input={{
                id: 'name',
                type: 'text',
                name: 'name',
                className: error === 'name' ? 'error' : '',
                value: userInfo.name,
                onChange,
                placeholder: '이름을 입력해주세요.',
              }}
              label={{ htmlFor: 'name', children: 'name' }}
            />
            <InputForm
              input={{
                id: 'career',
                type: 'text',
                name: 'career',
                className: error === 'career' ? 'error' : '',
                value: userInfo.career,
                onChange,
                placeholder: '직업을 입력해주세요.',
              }}
              label={{ htmlFor: 'career', children: 'career' }}
            />
            <div>
              <label htmlFor="introduce">introduce</label>
              <textarea
                id="introduce"
                name="introduce"
                placeholder="나를 소개해주세요:&#41;"
                value={userInfo.introduce}
                onChange={onChange}
              />
            </div>
          </InfoGroup>
          <FileGroup>
            <InputForm
              input={{ id: 'profile', name: 'profile', type: 'file', onChange }}
              label={{ htmlFor: 'profile', labelClass: 'blind', children: 'profile' }}
            />
            <Profile src={userInfo.profile} width={250} height={250} />
            <Email>
              <span>email</span>
              <span>{email}</span>
            </Email>
          </FileGroup>
        </MembershipCard>
      )}
      <ButtonGroup onCancel={onCancel} onConfirm={onConfirmUser} />
    </Wrapper>
  );
};

export default MypageEditForm;

const Wrapper = styled(ServiceMain)`
  padding-top: 50px;

  .membership__card {
    margin-top: 20px;
  }
`;

const InfoGroup = styled.div`
  width: 60%;

  .input__form {
    margin-bottom: 25px;
  }

  label {
    display: block;
    font-size: 1.3rem;
    margin-bottom: 8px;
    text-transform: capitalize;
  }

  input {
    width: 100%;
  }

  textarea {
    width: 100%;
    padding: 13px;
    border: 0;
    border-radius: 6px;
    font-size: 1.3rem;
    line-height: 1.3;
    background: ${({ theme }) => theme.color_gray_10};
    resize: none;
  }
`;

const Greeting = styled.p`
  margin-bottom: 50px;
  font-size: 2rem;
  line-height: 1.3;
  font-weight: bold;

  span {
    display: block;
  }
`;

const FileGroup = styled.div`
  ${flexbox('column', 'nowrap', 'flex-end', 'flex-start')}
  position: relative;
  padding: 30px;

  input {
    display: none;
  }

  label {
    position: absolute;
    left: 50%;
    top: 230px;
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color_purple_50} url(/images/mypage/camera.svg) no-repeat;
    background-position: center;
    text-indent: -9999px;
    transform: translate3d(60px, 0, 0);
    overflow: hidden;
  }
`;

const Email = styled.p`
  margin-top: 24px;
  font-size: 1.5rem;
  line-height: 1.3;

  span {
    display: block;
    font-size: 1.8rem;
    color: ${({ theme }) => theme.color_gray_70};

    &:first-child {
      margin-bottom: 8px;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.color_gray_100};
      text-transform: capitalize;
    }
  }
`;
