import { ScreenStepperLayout } from "../src/components/ScreenStepperLayout";
import FavoriteSongs from "../src/screens/registration/FavoriteSongs";
import { ProfileForm } from "../src/screens/registration/ProfileForm";
import UploadAvatar from "../src/screens/registration/UploadAvatar";

export default function Registration() {
  return (
    <ScreenStepperLayout>
      {[UploadAvatar, ProfileForm, FavoriteSongs]}
    </ScreenStepperLayout>
  );
}
