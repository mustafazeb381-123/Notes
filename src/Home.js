import { View, Text, Modal, Pressable, StyleSheet,Alert, TextInput, FlatList , ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Fab, Icon } from 'native-base'




const Home = () => {


   

    const [notes, setNotes] = useState([]);


    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [handleId, setHandleId] = useState("")
    const [handlefetch, setHandlefetch] = useState(true)

    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);



    useEffect(() => {
        getNotes();
        console.log("notes", notes)
    }, [handlefetch]);



    const getNotes = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@notes');
            if (jsonValue !== null) {
                setNotes(JSON.parse(jsonValue));
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    // const deleteNote = async (id) => {
    //     try {
    //         const newNotes = notes.filter((note) => note.id !== id);
    //         setNotes(newNotes);
    //         console.log("new notes", setNotes(newNotes));
    //         await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

   const handleUpdateModal = (id) => {
       console.log('notes ', notes, "id comming :", id)
       let result = notes.find(item => item.id == id)
       if (result) {
           setTitle(result?.title)
           setContent(result?.content)
           setHandleId(id)
           setOpen(true)
       }

       }

    const deleteNote = async (id) => {
        try {
            console.log('notes:', notes);
            const newNotes = notes.filter((note) => note.id !== id);
            console.log('newNotes:', newNotes);
            setNotes(newNotes);
            await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
        } catch (e) {
            console.log(e);
        }
    }

    const saveNote = async () => {
        try {
            const id = Date.now().toString();
            const note = { id, title, content };
            const newNotes = [...notes, note];
            setNotes(newNotes);
            await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
            setTitle('');
            setBody('');
        } catch (e) {
            console.log(e);
        }
    };

    const updateNote = async () => {
        console.log("item.id", handleId)
        try {
            const jsonValue = await AsyncStorage.getItem('@notes');
            console.log("jsonvalue", jsonValue);
            if (jsonValue !== null) {
                let notes = JSON.parse(jsonValue);
                // console.log("notes", notes);
                const index = notes.filter((note) => note.id !== handleId);
                console.log("index", index);
                let newNote = [ ...index, {"content": content, "title": title,"id":handleId }]
                // return console.log("new notes :", newNote)
                await AsyncStorage.setItem('@notes', JSON.stringify(newNote));
                setHandlefetch(!handlefetch)
                setOpen(false); 

            }
        } catch (e) {
            console.log(e);
        }
    };


  

    return (
      
        
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#eeeeee" translucent={true} />

          {loading ? (
              <View>
                  <ActivityIndicator color="blue" />
              </View>
          ) : (
              <FlatList
                  data={notes}
                  style={{ marginTop: 20 }}
                  showsVerticalScrollIndicator={false}
                  // numColumns={3}
                  ListEmptyComponent={() => (
                      <Text
                          style={{
                              color: "black",
                            //   fontFamily: fonts.MontserratBold,
                              alignSelf: "center",
                              fontSize: 20,
                              paddingTop: "50%",
                          }}
                      >
                        No Data Found
                      </Text>
                  )}
                        renderItem={({ item }) => {
                      
                      return (
                          <View
                              style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  width: "100%",
                                  paddingHorizontal: 20,
                                  marginTop: 20,
                              }}
                          >
                              <View
                                  style={{
                                      width: "100%",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      paddingHorizontal: 5,
                                      backgroundColor: "white",
                                      borderRadius: 20,
                                      justifyContent: "space-between",
                                      paddingVertical: 20,
                                  }}
                              >
                                  <View style={{width:'80%', alignItems:'flex-start',paddingHorizontal:20 ,justifyContent:'flex-start' }}>
                                      
                                  <Text style={{fontSize:18, color:'black', }}>
                                      {item.title}
                                  </Text>

                                  <Text style={{color:'black'}}>
                                      {item.content}
                                  </Text>
                                  </View>

                                  <View style={{ width: '20%', flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center' }}>
                                      <TouchableOpacity onPress={() => {deleteNote(item.id) }}>
                                          <AntDesign name="delete" size={20} color="black" />
                                      </TouchableOpacity>

                                      <TouchableOpacity onPress={() => { handleUpdateModal(item.id) }}>
                                          <AntDesign name="edit" size={20} color="black" />
                                      </TouchableOpacity>
                                  </View>
                                
                              </View>

                             
                          </View>
                      );
                  }}
              />
          )}




          <Modal style={styles.modal}
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>Hello World!</Text>

                      <View style={styles.inpputView}>
                          
                      <TextInput  onChangeText={(val)=> {setTitle(val)}} style={styles.input} placeholderTextColor={"black"} placeholder='Title' />
                      </View>

                      <View style={styles.inpputView}>
                          
                      <TextInput  onChangeText={(val)=> {setContent(val)}} style={styles.input} placeholder='Content'  placeholderTextColor={"black"}/>
                      </View>


                      <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => { setModalVisible(!modalVisible); saveNote() }}>
                          <Text style={styles.textStyle}>Save Data</Text>
                      </Pressable>
                  </View>
              </View>
          </Modal>



          <Modal style={styles.modal}
              animationType="slide"
              transparent={true}
              visible={open}
              onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setOpen(!open);
              }}>
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>Hello World!</Text>

                      <View style={styles.inpputView}>

                          <TextInput value={title} onChangeText={(val) => { setTitle(val) }} style={styles.input} placeholder='Title' />
                      </View>

                      <View style={styles.inpputView}>

                          <TextInput value={content} onChangeText={(val) => { setContent(val) }} style={styles.input} placeholder='Content' />
                      </View>


                      <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {updateNote()}}>
                          <Text style={styles.textStyle}>update Data</Text>
                      </Pressable>
                  </View>
              </View>
          </Modal>


        
          <Fab onPress={() => { setModalVisible(true) }} renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />} />
          {/* </Box> */}
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    input: {
        width: "100%",
        color:'black'
       

    },
    inpputView: {
        borderRadius: 10, borderWidth: 1,
        borderColor: 'black',
        width: "100%",
        marginVertical:5
    },

   
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width:'70%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        width: 250, justifyContent:"center",
        backgroundColor: '#F194FF',
        height:51
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

})

export default Home