import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type CreatePaymentResponse = {
  __typename?: 'CreatePaymentResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  clientSecret?: Maybe<Scalars['String']>;
};

export type ReservationInput = {
  price: Scalars['Float'];
  room: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPayment: CreatePaymentResponse;
  createRoom: CreateRoomResponse;
  completePhoneVerification: CompletePhoneVerificationResponse;
  createUserViaPhone: CreateUserViaPhoneResponse;
  editProfile: EditProfileResponse;
  emailSignIn: EmailSignInResponse;
  emailSignUp: EmailSignUpResponse;
  googleSignIn: GoogleSignInResponse;
  startPhoneVerification: StartPhoneVerificationResponse;
};


export type MutationCreatePaymentArgs = {
  reservation: ReservationInput;
  currency: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  name: Scalars['String'];
  price: Scalars['Float'];
  beds: Scalars['Int'];
  bedrooms: Scalars['Int'];
  bathroom: Scalars['Int'];
  guests: Scalars['Int'];
  checkIn: Scalars['DateTime'];
  checkOut: Scalars['DateTime'];
};


export type MutationCompletePhoneVerificationArgs = {
  phoneNumber: Scalars['String'];
  key: Scalars['String'];
};


export type MutationCreateUserViaPhoneArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  birthDate?: Maybe<Scalars['String']>;
};


export type MutationEditProfileArgs = {
  name?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};


export type MutationEmailSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationEmailSignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  birthDate?: Maybe<Scalars['String']>;
};


export type MutationGoogleSignInArgs = {
  email: Scalars['String'];
  avatar: Scalars['String'];
  name: Scalars['String'];
  googleId: Scalars['String'];
};


export type MutationStartPhoneVerificationArgs = {
  phoneNumber: Scalars['String'];
};

export type CreateRoomResponse = {
  __typename?: 'createRoomResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type GetRoomResponse = {
  __typename?: 'getRoomResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  room?: Maybe<Room>;
};

export type Query = {
  __typename?: 'Query';
  getRoom: GetRoomResponse;
  getRooms: GetRoomsResponse;
  getUserProfile: GetUserProfileResponse;
  hello?: Maybe<Scalars['String']>;
};


export type QueryGetRoomArgs = {
  id: Scalars['String'];
};

export type GetRoomsResponse = {
  __typename?: 'getRoomsResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  rooms?: Maybe<Array<Maybe<Room>>>;
};

export type CompletePhoneVerificationResponse = {
  __typename?: 'completePhoneVerificationResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};


export type CreateUserViaPhoneResponse = {
  __typename?: 'createUserViaPhoneResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type EditProfileResponse = {
  __typename?: 'EditProfileResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type EmailSignInResponse = {
  __typename?: 'emailSignInResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type EmailSignUpResponse = {
  __typename?: 'emailSignUpResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type GetUserProfileResponse = {
  __typename?: 'getUserProfileResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type GoogleSignInResponse = {
  __typename?: 'googleSignInResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type StartPhoneVerificationResponse = {
  __typename?: 'startPhoneVerificationResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Amenity = {
  __typename?: 'Amenity';
  id: Scalars['String'];
  name: Scalars['String'];
  room: Array<Maybe<Room>>;
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['String'];
  name: Scalars['String'];
  host: User;
  hostId: Scalars['String'];
  address: Address;
  roomType: RoomType;
  roomTypeId: Scalars['String'];
  amenities: Array<Maybe<Amenity>>;
  houseRules: Array<Maybe<HouseRule>>;
  facilities: Array<Maybe<Facility>>;
  reviews: Array<Maybe<Review>>;
  reservations: Array<Maybe<Reservation>>;
  lists: Array<Maybe<List>>;
  instantBook: Scalars['Boolean'];
  price: Scalars['Float'];
  photos: Array<Maybe<Photo>>;
  beds: Scalars['Int'];
  bedrooms: Scalars['Int'];
  bathrooms: Scalars['Float'];
  guests: Scalars['Int'];
  checkIn: Scalars['DateTime'];
  checkOut: Scalars['DateTime'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  description: Scalars['String'];
  averageRating: AverageReviewRating;
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  address: Scalars['String'];
  User: Array<Maybe<User>>;
  Room: Array<Maybe<Room>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  superhost: Scalars['Boolean'];
  language: Scalars['String'];
  currency: Scalars['String'];
  email: Scalars['String'];
  address?: Maybe<Address>;
  addressId?: Maybe<Scalars['String']>;
  rooms: Array<Maybe<Room>>;
  reviews: Array<Maybe<Review>>;
  lists: Array<Maybe<List>>;
  reservations: Array<Maybe<Reservation>>;
  chats: Array<Maybe<Chat>>;
  messages: Array<Maybe<Message>>;
  name: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['DateTime']>;
  bio?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  isVerified?: Maybe<Scalars['Boolean']>;
};

export type RoomType = {
  __typename?: 'RoomType';
  id: Scalars['String'];
  name: Scalars['String'];
  room: Array<Maybe<Room>>;
};

export type HouseRule = {
  __typename?: 'HouseRule';
  id: Scalars['String'];
  name: Scalars['String'];
  room: Array<Maybe<Room>>;
};

export type Facility = {
  __typename?: 'Facility';
  id: Scalars['String'];
  name: Scalars['String'];
  room: Array<Maybe<Room>>;
};

export type AverageReviewRating = {
  __typename?: 'AverageReviewRating';
  accuracy: Scalars['Float'];
  location: Scalars['Float'];
  communication: Scalars['Float'];
  value: Scalars['Float'];
  checkIn: Scalars['Float'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['String'];
  content: Scalars['String'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  accuracy: Scalars['Int'];
  location: Scalars['Int'];
  communication: Scalars['Int'];
  checkIn: Scalars['Int'];
  value: Scalars['Int'];
  User: User;
  Room: Room;
  averageRating: Scalars['Float'];
};

export type Reservation = {
  __typename?: 'Reservation';
  id: Scalars['String'];
  status: Scalars['String'];
  checkIn: Scalars['DateTime'];
  checkOut: Scalars['DateTime'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  guest?: Maybe<User>;
  price: Scalars['String'];
  Room?: Maybe<Room>;
};

export type List = {
  __typename?: 'List';
  id: Scalars['String'];
  name: Scalars['String'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  User?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  rooms: Array<Maybe<Room>>;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['String'];
  participations: Array<Maybe<User>>;
  messages: Array<Maybe<Message>>;
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  User?: Maybe<User>;
  Chat?: Maybe<Chat>;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['String'];
  text: Scalars['String'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  User?: Maybe<User>;
  Chat?: Maybe<Chat>;
};

export type Photo = {
  __typename?: 'Photo';
  id: Scalars['String'];
  caption: Scalars['String'];
  link: Scalars['String'];
  Room?: Maybe<Room>;
};

export type Verification = {
  __typename?: 'Verification';
  id: Scalars['String'];
  key?: Maybe<Scalars['String']>;
  payload: Scalars['String'];
};

export type GetRoomQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetRoomQuery = (
  { __typename?: 'Query' }
  & { getRoom: (
    { __typename?: 'getRoomResponse' }
    & Pick<GetRoomResponse, 'ok' | 'error'>
    & { room?: Maybe<(
      { __typename?: 'Room' }
      & Pick<Room, 'id' | 'name' | 'description' | 'beds' | 'bedrooms' | 'bathrooms' | 'price'>
      & { host: (
        { __typename?: 'User' }
        & Pick<User, 'name'>
      ), reviews: Array<Maybe<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'updated' | 'content' | 'created' | 'accuracy' | 'location' | 'communication' | 'checkIn' | 'value' | 'averageRating'>
        & { User: (
          { __typename?: 'User' }
          & Pick<User, 'name' | 'avatar'>
        ) }
      )>>, averageRating: (
        { __typename?: 'AverageReviewRating' }
        & Pick<AverageReviewRating, 'accuracy' | 'location' | 'communication' | 'checkIn' | 'value'>
      ), address: (
        { __typename?: 'Address' }
        & Pick<Address, 'id' | 'address'>
      ), roomType: (
        { __typename?: 'RoomType' }
        & Pick<RoomType, 'name'>
      ), amenities: Array<Maybe<(
        { __typename?: 'Amenity' }
        & Pick<Amenity, 'id' | 'name'>
      )>>, facilities: Array<Maybe<(
        { __typename?: 'Facility' }
        & Pick<Facility, 'name'>
      )>>, houseRules: Array<Maybe<(
        { __typename?: 'HouseRule' }
        & Pick<HouseRule, 'name'>
      )>>, photos: Array<Maybe<(
        { __typename?: 'Photo' }
        & Pick<Photo, 'id' | 'link' | 'caption'>
      )>> }
    )> }
  ) }
);

export type GetRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsQuery = (
  { __typename?: 'Query' }
  & { getRooms: (
    { __typename?: 'getRoomsResponse' }
    & Pick<GetRoomsResponse, 'ok' | 'error'>
    & { rooms?: Maybe<Array<Maybe<(
      { __typename?: 'Room' }
      & Pick<Room, 'id' | 'name' | 'description' | 'beds' | 'price'>
      & { photos: Array<Maybe<(
        { __typename?: 'Photo' }
        & Pick<Photo, 'link' | 'caption'>
      )>>, roomType: (
        { __typename?: 'RoomType' }
        & Pick<RoomType, 'name'>
      ) }
    )>>> }
  ) }
);

export type CompletePhoneVerificationMutationVariables = Exact<{
  phoneNumber: Scalars['String'];
  verificationCode: Scalars['String'];
}>;


export type CompletePhoneVerificationMutation = (
  { __typename?: 'Mutation' }
  & { isPhoneVerified: (
    { __typename?: 'completePhoneVerificationResponse' }
    & Pick<CompletePhoneVerificationResponse, 'ok' | 'error'>
  ) }
);

export type CreateUserViaEmailMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  birthDate: Scalars['String'];
}>;


export type CreateUserViaEmailMutation = (
  { __typename?: 'Mutation' }
  & { emailSignUp: (
    { __typename?: 'emailSignUpResponse' }
    & Pick<EmailSignUpResponse, 'ok' | 'error' | 'token'>
  ) }
);

export type CreateUserViaPhoneMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  birthDate: Scalars['String'];
}>;


export type CreateUserViaPhoneMutation = (
  { __typename?: 'Mutation' }
  & { createUserViaPhone: (
    { __typename?: 'createUserViaPhoneResponse' }
    & Pick<CreateUserViaPhoneResponse, 'ok' | 'error' | 'token'>
  ) }
);

export type EmailLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type EmailLoginMutation = (
  { __typename?: 'Mutation' }
  & { emailSignIn: (
    { __typename?: 'emailSignInResponse' }
    & Pick<EmailSignInResponse, 'ok' | 'error' | 'token'>
  ) }
);

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { profile: (
    { __typename?: 'getUserProfileResponse' }
    & Pick<GetUserProfileResponse, 'ok' | 'error'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'name' | 'avatar' | 'email'>
    )> }
  ) }
);

export type GoogleAuthMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  googleId: Scalars['String'];
  imageUrl: Scalars['String'];
}>;


export type GoogleAuthMutation = (
  { __typename?: 'Mutation' }
  & { googleAuth: (
    { __typename?: 'googleSignInResponse' }
    & Pick<GoogleSignInResponse, 'ok' | 'error' | 'token'>
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type StartPhoneVerificationMutationVariables = Exact<{
  phoneNumber: Scalars['String'];
}>;


export type StartPhoneVerificationMutation = (
  { __typename?: 'Mutation' }
  & { startPhoneVerification: (
    { __typename?: 'startPhoneVerificationResponse' }
    & Pick<StartPhoneVerificationResponse, 'ok' | 'error' | 'token'>
  ) }
);


export const GetRoomDocument = gql`
    query getRoom($id: String!) {
  getRoom(id: $id) {
    ok
    error
    room {
      id
      name
      description
      beds
      bedrooms
      bathrooms
      price
      host {
        name
      }
      reviews {
        id
        User {
          name
          avatar
        }
        updated
        content
        created
        updated
        accuracy
        location
        communication
        checkIn
        value
        averageRating
      }
      averageRating {
        accuracy
        location
        communication
        checkIn
        value
      }
      address {
        id
        address
      }
      roomType {
        name
      }
      amenities {
        id
        name
      }
      facilities {
        name
      }
      houseRules {
        name
      }
      photos {
        id
        link
        caption
      }
    }
  }
}
    `;

/**
 * __useGetRoomQuery__
 *
 * To run a query within a React component, call `useGetRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoomQuery(baseOptions: Apollo.QueryHookOptions<GetRoomQuery, GetRoomQueryVariables>) {
        return Apollo.useQuery<GetRoomQuery, GetRoomQueryVariables>(GetRoomDocument, baseOptions);
      }
export function useGetRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomQuery, GetRoomQueryVariables>) {
          return Apollo.useLazyQuery<GetRoomQuery, GetRoomQueryVariables>(GetRoomDocument, baseOptions);
        }
export type GetRoomQueryHookResult = ReturnType<typeof useGetRoomQuery>;
export type GetRoomLazyQueryHookResult = ReturnType<typeof useGetRoomLazyQuery>;
export type GetRoomQueryResult = Apollo.QueryResult<GetRoomQuery, GetRoomQueryVariables>;
export const GetRoomsDocument = gql`
    query getRooms {
  getRooms {
    ok
    error
    rooms {
      id
      name
      description
      beds
      photos {
        link
        caption
      }
      price
      roomType {
        name
      }
    }
  }
}
    `;

/**
 * __useGetRoomsQuery__
 *
 * To run a query within a React component, call `useGetRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRoomsQuery(baseOptions?: Apollo.QueryHookOptions<GetRoomsQuery, GetRoomsQueryVariables>) {
        return Apollo.useQuery<GetRoomsQuery, GetRoomsQueryVariables>(GetRoomsDocument, baseOptions);
      }
export function useGetRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomsQuery, GetRoomsQueryVariables>) {
          return Apollo.useLazyQuery<GetRoomsQuery, GetRoomsQueryVariables>(GetRoomsDocument, baseOptions);
        }
export type GetRoomsQueryHookResult = ReturnType<typeof useGetRoomsQuery>;
export type GetRoomsLazyQueryHookResult = ReturnType<typeof useGetRoomsLazyQuery>;
export type GetRoomsQueryResult = Apollo.QueryResult<GetRoomsQuery, GetRoomsQueryVariables>;
export const CompletePhoneVerificationDocument = gql`
    mutation completePhoneVerification($phoneNumber: String!, $verificationCode: String!) {
  isPhoneVerified: completePhoneVerification(
    key: $verificationCode
    phoneNumber: $phoneNumber
  ) {
    ok
    error
  }
}
    `;
export type CompletePhoneVerificationMutationFn = Apollo.MutationFunction<CompletePhoneVerificationMutation, CompletePhoneVerificationMutationVariables>;

/**
 * __useCompletePhoneVerificationMutation__
 *
 * To run a mutation, you first call `useCompletePhoneVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompletePhoneVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completePhoneVerificationMutation, { data, loading, error }] = useCompletePhoneVerificationMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      verificationCode: // value for 'verificationCode'
 *   },
 * });
 */
export function useCompletePhoneVerificationMutation(baseOptions?: Apollo.MutationHookOptions<CompletePhoneVerificationMutation, CompletePhoneVerificationMutationVariables>) {
        return Apollo.useMutation<CompletePhoneVerificationMutation, CompletePhoneVerificationMutationVariables>(CompletePhoneVerificationDocument, baseOptions);
      }
export type CompletePhoneVerificationMutationHookResult = ReturnType<typeof useCompletePhoneVerificationMutation>;
export type CompletePhoneVerificationMutationResult = Apollo.MutationResult<CompletePhoneVerificationMutation>;
export type CompletePhoneVerificationMutationOptions = Apollo.BaseMutationOptions<CompletePhoneVerificationMutation, CompletePhoneVerificationMutationVariables>;
export const CreateUserViaEmailDocument = gql`
    mutation createUserViaEmail($email: String!, $password: String!, $name: String!, $birthDate: String!) {
  emailSignUp(
    email: $email
    password: $password
    name: $name
    birthDate: $birthDate
  ) {
    ok
    error
    token
  }
}
    `;
export type CreateUserViaEmailMutationFn = Apollo.MutationFunction<CreateUserViaEmailMutation, CreateUserViaEmailMutationVariables>;

/**
 * __useCreateUserViaEmailMutation__
 *
 * To run a mutation, you first call `useCreateUserViaEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserViaEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserViaEmailMutation, { data, loading, error }] = useCreateUserViaEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *      birthDate: // value for 'birthDate'
 *   },
 * });
 */
export function useCreateUserViaEmailMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserViaEmailMutation, CreateUserViaEmailMutationVariables>) {
        return Apollo.useMutation<CreateUserViaEmailMutation, CreateUserViaEmailMutationVariables>(CreateUserViaEmailDocument, baseOptions);
      }
export type CreateUserViaEmailMutationHookResult = ReturnType<typeof useCreateUserViaEmailMutation>;
export type CreateUserViaEmailMutationResult = Apollo.MutationResult<CreateUserViaEmailMutation>;
export type CreateUserViaEmailMutationOptions = Apollo.BaseMutationOptions<CreateUserViaEmailMutation, CreateUserViaEmailMutationVariables>;
export const CreateUserViaPhoneDocument = gql`
    mutation createUserViaPhone($email: String!, $password: String!, $name: String!, $phone: String!, $birthDate: String!) {
  createUserViaPhone(
    email: $email
    password: $password
    name: $name
    phone: $phone
    birthDate: $birthDate
  ) {
    ok
    error
    token
  }
}
    `;
export type CreateUserViaPhoneMutationFn = Apollo.MutationFunction<CreateUserViaPhoneMutation, CreateUserViaPhoneMutationVariables>;

/**
 * __useCreateUserViaPhoneMutation__
 *
 * To run a mutation, you first call `useCreateUserViaPhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserViaPhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserViaPhoneMutation, { data, loading, error }] = useCreateUserViaPhoneMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      birthDate: // value for 'birthDate'
 *   },
 * });
 */
export function useCreateUserViaPhoneMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserViaPhoneMutation, CreateUserViaPhoneMutationVariables>) {
        return Apollo.useMutation<CreateUserViaPhoneMutation, CreateUserViaPhoneMutationVariables>(CreateUserViaPhoneDocument, baseOptions);
      }
export type CreateUserViaPhoneMutationHookResult = ReturnType<typeof useCreateUserViaPhoneMutation>;
export type CreateUserViaPhoneMutationResult = Apollo.MutationResult<CreateUserViaPhoneMutation>;
export type CreateUserViaPhoneMutationOptions = Apollo.BaseMutationOptions<CreateUserViaPhoneMutation, CreateUserViaPhoneMutationVariables>;
export const EmailLoginDocument = gql`
    mutation emailLogin($email: String!, $password: String!) {
  emailSignIn(email: $email, password: $password) {
    ok
    error
    token
  }
}
    `;
export type EmailLoginMutationFn = Apollo.MutationFunction<EmailLoginMutation, EmailLoginMutationVariables>;

/**
 * __useEmailLoginMutation__
 *
 * To run a mutation, you first call `useEmailLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmailLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailLoginMutation, { data, loading, error }] = useEmailLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useEmailLoginMutation(baseOptions?: Apollo.MutationHookOptions<EmailLoginMutation, EmailLoginMutationVariables>) {
        return Apollo.useMutation<EmailLoginMutation, EmailLoginMutationVariables>(EmailLoginDocument, baseOptions);
      }
export type EmailLoginMutationHookResult = ReturnType<typeof useEmailLoginMutation>;
export type EmailLoginMutationResult = Apollo.MutationResult<EmailLoginMutation>;
export type EmailLoginMutationOptions = Apollo.BaseMutationOptions<EmailLoginMutation, EmailLoginMutationVariables>;
export const GetUserDocument = gql`
    query getUser {
  profile: getUserProfile {
    ok
    error
    user {
      name
      avatar
      email
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GoogleAuthDocument = gql`
    mutation googleAuth($name: String!, $email: String!, $googleId: String!, $imageUrl: String!) {
  googleAuth: googleSignIn(
    name: $name
    email: $email
    googleId: $googleId
    avatar: $imageUrl
  ) {
    ok
    error
    token
  }
}
    `;
export type GoogleAuthMutationFn = Apollo.MutationFunction<GoogleAuthMutation, GoogleAuthMutationVariables>;

/**
 * __useGoogleAuthMutation__
 *
 * To run a mutation, you first call `useGoogleAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleAuthMutation, { data, loading, error }] = useGoogleAuthMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      googleId: // value for 'googleId'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useGoogleAuthMutation(baseOptions?: Apollo.MutationHookOptions<GoogleAuthMutation, GoogleAuthMutationVariables>) {
        return Apollo.useMutation<GoogleAuthMutation, GoogleAuthMutationVariables>(GoogleAuthDocument, baseOptions);
      }
export type GoogleAuthMutationHookResult = ReturnType<typeof useGoogleAuthMutation>;
export type GoogleAuthMutationResult = Apollo.MutationResult<GoogleAuthMutation>;
export type GoogleAuthMutationOptions = Apollo.BaseMutationOptions<GoogleAuthMutation, GoogleAuthMutationVariables>;
export const HelloDocument = gql`
    query hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const StartPhoneVerificationDocument = gql`
    mutation startPhoneVerification($phoneNumber: String!) {
  startPhoneVerification(phoneNumber: $phoneNumber) {
    ok
    error
    token
  }
}
    `;
export type StartPhoneVerificationMutationFn = Apollo.MutationFunction<StartPhoneVerificationMutation, StartPhoneVerificationMutationVariables>;

/**
 * __useStartPhoneVerificationMutation__
 *
 * To run a mutation, you first call `useStartPhoneVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartPhoneVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startPhoneVerificationMutation, { data, loading, error }] = useStartPhoneVerificationMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useStartPhoneVerificationMutation(baseOptions?: Apollo.MutationHookOptions<StartPhoneVerificationMutation, StartPhoneVerificationMutationVariables>) {
        return Apollo.useMutation<StartPhoneVerificationMutation, StartPhoneVerificationMutationVariables>(StartPhoneVerificationDocument, baseOptions);
      }
export type StartPhoneVerificationMutationHookResult = ReturnType<typeof useStartPhoneVerificationMutation>;
export type StartPhoneVerificationMutationResult = Apollo.MutationResult<StartPhoneVerificationMutation>;
export type StartPhoneVerificationMutationOptions = Apollo.BaseMutationOptions<StartPhoneVerificationMutation, StartPhoneVerificationMutationVariables>;