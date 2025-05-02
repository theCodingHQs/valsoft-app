import FileSelector from '@/components/ui/input/file-selector';
import { upload } from '@/helpers/api-client';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useGetDocumentsByPropertyVisitId } from '../../api-queries/property-visit';
import { PropertyVisit } from '../../models';
import { PropertyVisitDocumentType } from '../../models/documents';

interface VisitDocumentFormProps {
  propertyVisit?: PropertyVisit;
}

const VisitDocuments = ({ propertyVisit }: VisitDocumentFormProps) => {
  const [documents, setDocuments] = useState<PropertyVisitDocumentType[]>([]);
  const { data: propertyVisitDocuments } = useGetDocumentsByPropertyVisitId(
    propertyVisit?.id!
  );

  const [files, setFiles] = useState<File[]>([]);

  const url = `/property_visits/${propertyVisit?.id}/property_visit_documents`;

  const handleFileChange = (file: File) => {
    console.log('file changed', file);
    setFiles([...files, file]);
  };

  //   const reFetchQuery = useReFetchQueryById([
  //     'valuations',
  //     `valuations/${propertyVisit?.valuation_id}`,
  //     `property_visits/${propertyVisit?.id}`,
  //     'property_visit_documents',
  //   ]);

  const handleUpload = async () => {
    if (files) {
      for (const file of files) {
        const formData = new FormData();
        formData.append('valuations_property_visit_document[document]', {
          uri: file.uri,
          name: file.name,
          type: file.mimeType || 'application/octet-stream', // fallback type
        } as any);
        formData.append(`valuations_property_visit_document[title]`, file.name);
        formData.append(
          `valuations_property_visit_document[description]`,
          file.name
        );
        const uploadResult = upload(url, formData);

        await Promise.all([uploadResult]);

        uploadResult.then((result) => {
          if (result.data?.id) {
            // toastSuccess(`${file.name} - Upload Successfully !`)
            console.log(`${file.name} - Upload Successfully !`);
          } else {
            result.data.document.forEach((message: string) => {
              //   toastError(`${file.name} - ${message}`)
              console.log(`${file.name} - ${message}`);
            });
          }
        });
        // reFetchQuery(propertyVisit?.id);
      }
    }
  };

  useEffect(() => {
    if (propertyVisitDocuments?.length >= 0) {
      setDocuments(
        propertyVisitDocuments?.map((document) => {
          return { ...document, rotation: 0 };
        })
      );
    }
  }, [propertyVisitDocuments]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FileSelector onSelect={handleFileChange} />
      </View>

      <Button
        mode="contained"
        style={styles.submitButton}
        onPress={handleUpload}
      >
        Submit
      </Button>
    </View>
  );
};

export default VisitDocuments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
