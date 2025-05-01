

import { Alert } from 'react-native';

export const showDeleteConfirmation = (title, message, itemId, deleteAction) => {
  Alert.alert(
    title,                  
    message,                
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => deleteAction(itemId),
      },
    ]
  )
}