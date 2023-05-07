import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

class Feedback {
  coursePasscode: string;
  startTime: string;
  endTime: string;
  instructor: string;

  constructor() {}

  // reference = database().ref('InternalDb/Feedback/');
  reference = firestore().collection('Feedback');

  // getFeedback = async passCode => {
  //   let ans = null;
  //   console.log("why is this working")
  //   await this.reference
  //     .orderByChild('passCode')
  //     .equalTo(passCode)
  //     .once('value')
  //     .then(snapshot => {
  //       if (snapshot.val()) {
  //         ans = snapshot.val();
  //         console.log("getfeedback", ans);
  //       }
  //     });
  //   return ans;
  // };

  getFeedback = async passCode => {
    let ans = null;
    console.log("why is this working")
    await this.reference
      .where('passCode' ,'==', passCode)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const id = snapshot.docs[0].id
          ans = {...snapshot.docs[0].data(),id};
          console.log("getfeedback", ans);
        }
      });
    return ans;
  };

  // getFeedbackDetails = async passCode => {
  //   let ans = null;
  //   await this.reference
  //     .orderByChild('passCode')
  //     .equalTo(passCode)
  //     .once('value')
  //     .then(snapshot => {
  //       if (snapshot.val()) {
  //         const keys = Object.values(snapshot.val());
  //         ans = keys[0];
  //         console.log("feedback details", keys);
  //         console.log("keys[0]", ans);
  //       }
  //     });
  //   return ans;
  // };
  
  getFeedbackDetails = async passCode => {
    let ans = null;
    console.log("error in getFeedbackDetails");
    await this.reference
      .where('passCode', '==', passCode)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          ans = snapshot.docs[0].data();
          // console.log("feedback details", keys);
          console.log("keys[0]", ans);
        }
      });
    return ans;
  };

  // setFeedback = async (
  //   passCode,
  //   startTime,
  //   endTime,
  //   kind,
  //   instructor,
  //   url,
  //   emailResponse,
  //   feedbackCount,
  //   summary,
  // ) => {
  //   await database()
  //     .ref('InternalDb/Feedback/' + url)
  //     .set({
  //       passCode: passCode,
  //       startTime: startTime,
  //       endTime: endTime,
  //       kind: kind,
  //       instructor: instructor,
  //       emailResponse: emailResponse,
  //       feedbackCount: feedbackCount,
  //       summary:summary,
  //     })
  //     .then(() => {
  //       console.log('Feedback modified');
  //     });
  // };

  setFeedback = async (
    passCode,
    startTime,
    endTime,
    kind,
    instructor,
    url,
    emailResponse,
    feedbackCount,
    summary,
  ) => {

    if(summary){
      await this.reference
      .doc(url)
      .set({
        passCode: passCode,
        startTime: startTime,
        endTime: endTime,
        kind: kind,
        instructor: instructor,
        emailResponse: emailResponse,
        feedbackCount: feedbackCount,
        summary:summary,
      })
      .then(() => {
        console.log('Feedback modified');
      });
    }
    else{
      await this.reference
      .doc(url)
      .set({
        passCode: passCode,
        startTime: startTime,
        endTime: endTime,
        kind: kind,
        instructor: instructor,
        emailResponse: emailResponse,
        feedbackCount: feedbackCount
      })
      .then(() => {
        console.log('Feedback modified');
      });
    }

    
  };

  // createFeedback = async (
  //   passCode,
  //   startTime,
  //   endTime,
  //   kind,
  //   instructor,
  // ) => {
  //   await this.reference
  //   .push()
  //   .set({
  //       passCode: passCode,
  //       startTime: startTime,
  //       endTime: endTime,
  //       kind: kind,
  //       instructor: instructor,
  //       emailResponse: false,
  //       feedbackCount: 1,
  //     })
  //     .then(() => {
  //       console.log('Feedback created');
  //     });
  // };

  createFeedback = async (
    passCode,
    startTime,
    endTime,
    kind,
    instructor,
  ) => {
    await this.reference
    .add({
        passCode: passCode,
        startTime: startTime,
        endTime: endTime,
        kind: kind,
        instructor: instructor,
        emailResponse: false,
        feedbackCount: 1,
      })
      .then(() => {
        console.log('Feedback created');
      });
  };
}

export default Feedback;
