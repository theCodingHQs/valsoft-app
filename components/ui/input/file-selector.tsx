// FileSelector.tsx
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { Button, useTheme } from 'react-native-paper';

const FileSelector = ({ onSelect }: { onSelect: (fileUri: File) => void }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const { colors, roundness } = useTheme();

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets?.[0]) {
        onSelect(result.assets[0].file as File);
        setFileName(result.assets[0].name);
      }
    } catch (err) {
      console.error('Error picking file:', err);
    }
  };

  return (
    <Button mode="contained" onPress={pickFile}>
      {fileName ?? 'Choose File'}
    </Button>
  );
};

export default FileSelector;
