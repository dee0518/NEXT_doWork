import Image from 'next/image';
import styled from 'styled-components';
import defaultProfile from 'images/mypage/profile.svg';

type TProps = {
  width: number;
  height: number;
  src: string | ArrayBuffer;
};

const Profile = ({ width, height, src }: TProps) => (
  <ProfileImage src={src || defaultProfile} width={width} height={height} alt="profile" />
);

export default Profile;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;
