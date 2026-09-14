export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const SiteSettingsPartsFragmentDoc = gql`
    fragment SiteSettingsParts on SiteSettings {
  __typename
  brand {
    __typename
    logo
    logoAlt
    favicon
  }
  hero {
    __typename
    label
    title
    description
    primaryCta {
      __typename
      label
      href
    }
    secondaryCta {
      __typename
      label
      href
    }
    badges
    image
    imageAlt
    imagePlaceholder
  }
  therapyApproach {
    __typename
    label
    title
    description
    pillars {
      __typename
      title
      description
      icon
    }
  }
  servicesSection {
    __typename
    label
    title
    items {
      __typename
      title
      shortDescription
      href
      icon
      thumbnail
      thumbnailAlt
    }
  }
  experienceSection {
    __typename
    label
    title
    items {
      __typename
      area
    }
  }
  trainingSection {
    __typename
    label
    title
    clinicalTitle
    clinicalItems {
      __typename
      degree
      institution
      year
    }
    complementaryTitle
    complementaryItems {
      __typename
      degree
      institution
      year
    }
  }
  cta {
    __typename
    title
    description
    label
    href
  }
  courseHighlight {
    __typename
    label
    title
    description
    ctaLabel
    ctaHref
  }
  faqSection {
    __typename
    label
    title
    description
    items {
      __typename
      question
      answer
    }
  }
  coursesPage {
    __typename
    label
    title
    intro
    image
    imageAlt
    seoTitle
    seoDescription
  }
  resourcesPage {
    __typename
    label
    title
    intro
    image
    imageAlt
    seoTitle
    seoDescription
  }
  contact {
    __typename
    email
    phone
    whatsapp
    instagram
    telegram
    tiktok
    linkedin
    googleMapsEmbedUrl
    googleMapsLink
  }
  legal {
    __typename
    collegiateNumber
    businessName
    taxId
    address
  }
  seo {
    __typename
    homeTitle
    homeDescription
  }
  booking {
    __typename
    calComUrl
    presencialUrl
    onlineUrl
  }
}
    `;
export const FaqPartsFragmentDoc = gql`
    fragment FaqParts on Faq {
  __typename
  question
  answer
  order
  category
  published
}
    `;
export const ProfilePartsFragmentDoc = gql`
    fragment ProfileParts on Profile {
  __typename
  hero {
    __typename
    label
    title
    intro
    photo
    photoAlt
    secondaryPhoto
    secondaryPhotoAlt
    photoPlaceholder
  }
  approach {
    __typename
    label
    title
    paragraphs
  }
  trainingSection {
    __typename
    label
    title
    clinicalTitle
    clinicalItems {
      __typename
      degree
      institution
      year
    }
    complementaryTitle
    complementaryItems {
      __typename
      degree
      institution
      year
    }
  }
  experienceSection {
    __typename
    label
    title
    items {
      __typename
      area
    }
  }
  cta {
    __typename
    title
    description
    label
    href
  }
  seoTitle
  seoDescription
}
    `;
export const ExperiencePartsFragmentDoc = gql`
    fragment ExperienceParts on Experience {
  __typename
  area
  order
  published
}
    `;
export const TrainingPartsFragmentDoc = gql`
    fragment TrainingParts on Training {
  __typename
  degree
  institution
  year
  category
  order
  published
}
    `;
export const ServicesPagePartsFragmentDoc = gql`
    fragment ServicesPageParts on ServicesPage {
  __typename
  hero {
    __typename
    label
    title
    description
  }
  modalitiesSection {
    __typename
    label
    title
    items {
      __typename
      title
      badge
      icon
      description
      schedule
      feature
      featureIcon
      primaryButtonText
      primaryButtonHref
      secondaryButtonText
      secondaryButtonHref
    }
  }
  specialtiesSection {
    __typename
    label
    title
    description
    items {
      __typename
      title
      shortDescription
      slug
      icon
      thumbnail
      thumbnailAlt
    }
  }
  cta {
    __typename
    title
    description
    label
    href
  }
  seoTitle
  seoDescription
}
    `;
export const ServicesPartsFragmentDoc = gql`
    fragment ServicesParts on Services {
  __typename
  title
  slug
  heroLabel
  shortDescription
  description
  published
  order
  icon
  ctaTitle
  ctaDescription
  ctaLabel
  ctaHref
  thumbnail
  thumbnailAlt
  image
  imageAlt
  heroImage
  heroImageAlt
  seoTitle
  seoDescription
  body
}
    `;
export const ResourcesPartsFragmentDoc = gql`
    fragment ResourcesParts on Resources {
  __typename
  title
  heroLabel
  slug
  description
  published
  featured
  publishedAt
  image
  tags
  ctaLabel
  ctaHref
  seoTitle
  seoDescription
  body
}
    `;
export const CoursesPartsFragmentDoc = gql`
    fragment CoursesParts on Courses {
  __typename
  title
  slug
  shortDescription
  description
  published
  heroLabel
  audienceIntro
  paymentLink
  ctaLabel
  image
  imageAlt
  seoTitle
  seoDescription
  bottomCta {
    __typename
    title
    description
    ctaLabel
    ctaHref
  }
  body
}
    `;
export const ContactPagePartsFragmentDoc = gql`
    fragment ContactPageParts on ContactPage {
  __typename
  seoTitle
  seoDescription
  hero {
    __typename
    label
    title
    intro
  }
  firstConsultation {
    __typename
    title
    paragraphs
    calendarCta {
      __typename
      prefix
      linkLabel
      linkHref
      suffix
    }
  }
  contactDetails {
    __typename
    title
    email
    phone
    whatsapp
    address
    mapCardTitle
    mapNote
  }
  formSection {
    __typename
    title
    nameLabel
    namePlaceholder
    emailLabel
    emailPlaceholder
    messageLabel
    messagePlaceholder
    privacyConsentText
    submitLabel
    privacyNote
  }
}
    `;
export const SiteSettingsDocument = gql`
    query siteSettings($relativePath: String!) {
  siteSettings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteSettingsParts
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
export const SiteSettingsConnectionDocument = gql`
    query siteSettingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteSettingsFilter) {
  siteSettingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteSettingsParts
      }
    }
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
export const FaqDocument = gql`
    query faq($relativePath: String!) {
  faq(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FaqParts
  }
}
    ${FaqPartsFragmentDoc}`;
export const FaqConnectionDocument = gql`
    query faqConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FaqFilter) {
  faqConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FaqParts
      }
    }
  }
}
    ${FaqPartsFragmentDoc}`;
export const ProfileDocument = gql`
    query profile($relativePath: String!) {
  profile(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProfileParts
  }
}
    ${ProfilePartsFragmentDoc}`;
export const ProfileConnectionDocument = gql`
    query profileConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProfileFilter) {
  profileConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProfileParts
      }
    }
  }
}
    ${ProfilePartsFragmentDoc}`;
export const ExperienceDocument = gql`
    query experience($relativePath: String!) {
  experience(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ExperienceParts
  }
}
    ${ExperiencePartsFragmentDoc}`;
export const ExperienceConnectionDocument = gql`
    query experienceConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ExperienceFilter) {
  experienceConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ExperienceParts
      }
    }
  }
}
    ${ExperiencePartsFragmentDoc}`;
export const TrainingDocument = gql`
    query training($relativePath: String!) {
  training(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TrainingParts
  }
}
    ${TrainingPartsFragmentDoc}`;
export const TrainingConnectionDocument = gql`
    query trainingConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TrainingFilter) {
  trainingConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TrainingParts
      }
    }
  }
}
    ${TrainingPartsFragmentDoc}`;
export const ServicesPageDocument = gql`
    query servicesPage($relativePath: String!) {
  servicesPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServicesPageParts
  }
}
    ${ServicesPagePartsFragmentDoc}`;
export const ServicesPageConnectionDocument = gql`
    query servicesPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServicesPageFilter) {
  servicesPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServicesPageParts
      }
    }
  }
}
    ${ServicesPagePartsFragmentDoc}`;
export const ServicesDocument = gql`
    query services($relativePath: String!) {
  services(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServicesParts
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ServicesConnectionDocument = gql`
    query servicesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServicesFilter) {
  servicesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServicesParts
      }
    }
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ResourcesDocument = gql`
    query resources($relativePath: String!) {
  resources(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ResourcesParts
  }
}
    ${ResourcesPartsFragmentDoc}`;
export const ResourcesConnectionDocument = gql`
    query resourcesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ResourcesFilter) {
  resourcesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ResourcesParts
      }
    }
  }
}
    ${ResourcesPartsFragmentDoc}`;
export const CoursesDocument = gql`
    query courses($relativePath: String!) {
  courses(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CoursesParts
  }
}
    ${CoursesPartsFragmentDoc}`;
export const CoursesConnectionDocument = gql`
    query coursesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CoursesFilter) {
  coursesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CoursesParts
      }
    }
  }
}
    ${CoursesPartsFragmentDoc}`;
export const ContactPageDocument = gql`
    query contactPage($relativePath: String!) {
  contactPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ContactPageParts
  }
}
    ${ContactPagePartsFragmentDoc}`;
export const ContactPageConnectionDocument = gql`
    query contactPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactPageFilter) {
  contactPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ContactPageParts
      }
    }
  }
}
    ${ContactPagePartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    siteSettings(variables, options) {
      return requester(SiteSettingsDocument, variables, options);
    },
    siteSettingsConnection(variables, options) {
      return requester(SiteSettingsConnectionDocument, variables, options);
    },
    faq(variables, options) {
      return requester(FaqDocument, variables, options);
    },
    faqConnection(variables, options) {
      return requester(FaqConnectionDocument, variables, options);
    },
    profile(variables, options) {
      return requester(ProfileDocument, variables, options);
    },
    profileConnection(variables, options) {
      return requester(ProfileConnectionDocument, variables, options);
    },
    experience(variables, options) {
      return requester(ExperienceDocument, variables, options);
    },
    experienceConnection(variables, options) {
      return requester(ExperienceConnectionDocument, variables, options);
    },
    training(variables, options) {
      return requester(TrainingDocument, variables, options);
    },
    trainingConnection(variables, options) {
      return requester(TrainingConnectionDocument, variables, options);
    },
    servicesPage(variables, options) {
      return requester(ServicesPageDocument, variables, options);
    },
    servicesPageConnection(variables, options) {
      return requester(ServicesPageConnectionDocument, variables, options);
    },
    services(variables, options) {
      return requester(ServicesDocument, variables, options);
    },
    servicesConnection(variables, options) {
      return requester(ServicesConnectionDocument, variables, options);
    },
    resources(variables, options) {
      return requester(ResourcesDocument, variables, options);
    },
    resourcesConnection(variables, options) {
      return requester(ResourcesConnectionDocument, variables, options);
    },
    courses(variables, options) {
      return requester(CoursesDocument, variables, options);
    },
    coursesConnection(variables, options) {
      return requester(CoursesConnectionDocument, variables, options);
    },
    contactPage(variables, options) {
      return requester(ContactPageDocument, variables, options);
    },
    contactPageConnection(variables, options) {
      return requester(ContactPageConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
