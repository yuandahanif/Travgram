import { StyledPressable, StyledText, StyledView } from '@components/styled';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@config/firebase';
import { useAuthentication } from '@utils/useAuthentication';


const EditProfileScreen = () => {
  const [text, setText] = useState('');
  const [nama, setnama] = useState('');
  const [nama_pengguna, setnama_namapengguna] = useState('');
  const [no_hp, setno_hp] = useState('');
  const [alamat, setalamat] = useState('');
  const { user } = useAuthentication();

  const create = () => {
    if (user?.uid) {
      setDoc(doc(db, "pengguna", user?.uid), {
        nama: nama,
        nama_pengguna: nama_pengguna,
        no_hp: no_hp,
        alamat: alamat,

      }).then(() => {
        console.log('data submitted');
      }).catch((error) => {
        console.log(error);
      });
    } else {
      alert('ERROR: uid tidak ada')
    }
  }

  return (
    <View style={{ padding: 10 }}>
      <StyledView className=' '>
        <StyledText className='mr-2 text-lg'>
          Nama :
        </StyledText>
        <TextInput
          value={nama}
          style={{ height: 40, fontSize: 18 }}
          placeholder="Type here to translate!"
          onChangeText={(nama) => setnama(nama)}
          defaultValue={nama}
        />
      </StyledView>

      <StyledView className=' '>
        <StyledText className='mr-2 text-lg'>
          Nama Pengguna :
        </StyledText>
        <TextInput
          value={nama_pengguna}
          style={{ height: 40, fontSize: 18 }}
          placeholder="Type here to translate!"
          onChangeText={(nama_pengguna) => setnama_namapengguna(nama_pengguna)}
          defaultValue={text}
        />
      </StyledView>

      <StyledView className=' '>
        <StyledText className='mr-2 text-lg'>
          No. Hp :
        </StyledText>
        <TextInput
          value={no_hp}
          style={{ height: 40, fontSize: 18 }}
          placeholder="Type here to translate!"
          onChangeText={(no_hp) => setno_hp(no_hp)}
          defaultValue={text}
        />
      </StyledView>

      <StyledView className=' '>
        <StyledText className='mr-2 text-lg'>
          Alamat :
        </StyledText>
        <TextInput
          value={alamat}
          style={{ height: 40, fontSize: 18 }}
          placeholder="Type here to translate!"
          onChangeText={(alamat) => setalamat(alamat)}
          defaultValue={text}
        />
      </StyledView>

      <StyledPressable className="bg-lime-500 px-8 py-2 rounded-lg mt-5" onPress={create}>
        <StyledText>Edit Profille</StyledText>
      </StyledPressable>


    </View>
  );
};

export default EditProfileScreen;