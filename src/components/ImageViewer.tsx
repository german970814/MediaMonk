import React from "react";
import Header from "./Header";
import { useState } from "@md/hooks/commons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Modal,
  View,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

interface ImageViewerModalProps {}

export interface ImageViewerModalRef {
  close: () => void;
  open: (item: Photo) => void;
}

export default React.forwardRef<ImageViewerModalRef, ImageViewerModalProps>(
  function ImageViewerModal(props, ref) {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const [state, setState] = useState<{ visible: boolean; image?: Photo }>({
      visible: false,
    });

    const onClose = React.useCallback(() => {
      setState({ visible: false, image: undefined });
    }, []);

    React.useImperativeHandle(ref, () => ({
      close: onClose,
      open: (image: Photo) => setState({ visible: true, image }),
    }));

    return (
      <Modal
        transparent
        animationType="fade"
        visible={state.visible}
        onRequestClose={onClose}
      >
        <View
          style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          }}
        >
          <Header margins backIconColor="#FFF" onBackPress={onClose} />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable
              onPress={onClose}
              style={StyleSheet.absoluteFillObject}
            />
            {!!state.image && (
              <Image
                source={{ uri: state.image.url }}
                style={{ width, aspectRatio: 1 }}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }
);
