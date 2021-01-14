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

export type CreateRoomResponse = {
  __typename?: 'createRoomResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom: CreateRoomResponse;
  completePhoneVerification: CompletePhoneVerificationResponse;
  createUserViaPhone: CreateUserViaPhoneResponse;
  editProfile: EditProfileResponse;
  emailSignIn: EmailSignInResponse;
  emailSignUp: EmailSignUpResponse;
  googleSignIn: GoogleSignInResponse;
  phoneVerification: PhoneVerificationResponse;
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


export type MutationPhoneVerificationArgs = {
  phoneNumber: Scalars['String'];
};

export type GetRoomsResponse = {
  __typename?: 'getRoomsResponse';
  ok: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  rooms?: Maybe<Array<Maybe<Room>>>;
};

export type Query = {
  __typename?: 'Query';
  getRooms: GetRoomsResponse;
  getUserProfile: GetUserProfileResponse;
  hello?: Maybe<Scalars['String']>;
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

export type PhoneVerificationResponse = {
  __typename?: 'phoneVerificationResponse';
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
  bathroom: Scalars['Int'];
  guests: Scalars['Int'];
  checkIn: Scalars['DateTime'];
  checkOut: Scalars['DateTime'];
  created: Scalars['DateTime'];
  updated: Scalars['DateTime'];
  description: Scalars['String'];
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

export type GetRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsQuery = (
  { __typename?: 'Query' }
  & { getRooms: (
    { __typename?: 'getRoomsResponse' }
    & Pick<GetRoomsResponse, 'ok' | 'error'>
    & { rooms?: Maybe<Array<Maybe<(
      { __typename?: 'Room' }
      & Pick<Room, 'id' | 'name' | 'description' | 'beds'>
    )>>> }
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);


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